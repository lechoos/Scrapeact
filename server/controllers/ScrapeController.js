const puppeteer = require('puppeteer');

const ScrapeController = async (req, res) => {
	const { link } = req.body;

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

		await page.waitForSelector(sidebarSelector);

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
						const spans = wrapper.querySelectorAll('span');
						const regex = /([0-9]+( [0-9]+)+)/i;

						let phone;
						spans.forEach(span => {
							if (regex.test(span.textContent)) {
								phone = span.textContent;
							}
						});

						return {
							name: name,
							link: link.getAttribute('href'),
							phone: phone,
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

		const companiesData = JSON.stringify(finalArr);

    res.send(companiesData)
	} catch (ex) {
		console.log(ex);
	}
};

module.exports = ScrapeController;