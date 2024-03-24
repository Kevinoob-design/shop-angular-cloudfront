import { Config } from './config.interface'

export const environment: Config = {
	production: true,
	apiEndpoints: {
		product: 'https://vc20i23gc5.execute-api.us-east-1.amazonaws.com/dev',
		order: 'https://vc20i23gc5.execute-api.us-east-1.amazonaws.com/dev',
		import: 'https://vc20i23gc5.execute-api.us-east-1.amazonaws.com/dev',
		bff: 'https://vc20i23gc5.execute-api.us-east-1.amazonaws.com/dev',
		cart: 'https://vc20i23gc5.execute-api.us-east-1.amazonaws.com/dev'
	},
	apiEndpointsEnabled: {
		product: false,
		order: false,
		import: false,
		bff: true,
		cart: false
	}
}
