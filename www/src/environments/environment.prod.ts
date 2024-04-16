import { Config } from './config.interface'

export const environment: Config = {
	production: true,
	apiEndpoints: {
		product: 'https://wy90rfbtf9.execute-api.us-east-1.amazonaws.com/dev',
		order: 'https://wy90rfbtf9.execute-api.us-east-1.amazonaws.com/dev',
		import: 'https://gi1n2c6d18.execute-api.us-east-1.amazonaws.com/dev',
		bff: 'https://wy90rfbtf9.execute-api.us-east-1.amazonaws.com/dev',
		cart: 'https://wy90rfbtf9.execute-api.us-east-1.amazonaws.com/dev'
	},
	apiEndpointsEnabled: {
		product: false,
		order: false,
		import: true,
		bff: true,
		cart: false
	}
}
