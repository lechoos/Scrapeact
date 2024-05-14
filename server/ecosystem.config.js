module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      user : 'root',
      host : '185.238.74.170',
      ref  : 'origin/master',
      repo : 'git@github.com:lechoos/scrapeact-api.git',
      path : '/root',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
