const puppeteer = require('puppeteer');

const ScrapeController = async (req, res) => {
	const { link } = await req.body;
	console.log(link);

	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setViewport({ width: 1536, height: 703 });
		await page.goto(link);
		await page.evaluate(() => {
			window.scrollTo(0, 1000);
		});
		await page.evaluate(() => {
			const acceptButton = document.querySelector('button[aria-label="Zaakceptuj wszystko"]');
			if (acceptButton) {
				acceptButton.click();
			}
		});
		const sidebarSelector = '.tTVLSc';

		try {
			await page.waitForSelector(sidebarSelector);
		} catch (error) {
			return res.status(404).send({ error: true, message: 'Link jest nieprawidłowy' });
		}

		async function autoScroll(page) {
			await page.evaluate(async () => {
				const wrapper = document.querySelector('div[role="feed"]');

				await new Promise((resolve, reject) => {
					let totalHeight = 0;
					let distance = 1000;
					let scrollDelay = 3000;

					let timer = setInterval(async () => {
						let scrollHeightBefore = wrapper.scrollHeight;
						wrapper.scrollBy(0, distance);
						totalHeight += distance;

						if (totalHeight >= scrollHeightBefore) {
							totalHeight = 0;
							await new Promise(resolve => setTimeout(resolve, scrollDelay));

							// Calculate scrollHeight after waiting
							let scrollHeightAfter = wrapper.scrollHeight;

							if (scrollHeightAfter > scrollHeightBefore) {
								// More content loaded, keep scrolling
								return;
							} else {
								// No more content loaded, stop scrolling
								clearInterval(timer);
								resolve();
							}
						}
					}, 200);
				});
			});
		}

		await autoScroll(page);

		const parents = await page.$$eval('a[href^="https://www.google.com/maps/place/"]', els => {
			const finalArr = els
				.map(parent => {
					const wrapper = document.createElement('div');
					wrapper.innerHTML = parent.parentNode.innerHTML;

					if (!wrapper.querySelector('a[data-value="Witryna"]')) {
						const name = wrapper.querySelector('.fontHeadlineSmall').textContent;
						const link = wrapper.querySelector('a');

						return {
							name: name,
							link: link.getAttribute('href'),
						};
					}
				})
				.filter(Boolean); // Remove undefined elements from the array

			return {
				finalArr,
				len: els.length,
			};
		});

		const { finalArr, len } = parents;
		console.log(len);

		const arrayToRespond = [];

		for (const item of finalArr) {
			const page = await browser.newPage();
			await page.goto(item.link);

			let hasWebsite = '';

			try {
				hasWebsite = await page.$eval('a[aria-label^="Witryna"]', el => el.getAttribute('href'));
			} catch (ex) {}

			if (hasWebsite !== undefined && hasWebsite !== '') {
				const index = finalArr.indexOf(item);
				finalArr.splice(index, 1);
			} else {
				let phone = '';
				try {
					phone = await page.$eval('button[aria-label^="Telefon:"]', el => el.textContent.trim());
					phone = phone.replace(/^[^\d]+/, '');
				} catch (error) {
					item.phone = 'Nie znaleziono';
				} finally {
					item.phone = phone || 'Nie znaleziono';
					arrayToRespond.push(item);
					setTimeout(async () => {
						await page.close();
					}, 100);
				}
			}
		}

		console.log('--------------');
		console.log(arrayToRespond.length);

		const companiesData = JSON.stringify(arrayToRespond);

		res.send(companiesData);
	} catch (ex) {
		console.log(ex);
	}
};

module.exports = ScrapeController;
