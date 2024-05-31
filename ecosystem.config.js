 
module.exports = {
  apps: [
    {
      name: `agicto-playground-${process.env.ENVIRONMENT}`,
      script: './server.js',
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      instances: `${process.env.ENVIRONMENT == 'prod' ? 2 : 1}`,
      node_args: '--max-http-header-size=2400',
      PORT: `${process.env.PORT}`
    }
  ]
}
