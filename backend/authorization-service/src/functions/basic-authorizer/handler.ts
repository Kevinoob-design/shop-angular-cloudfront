import type { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent, Handler } from 'aws-lambda'
import { AUTHORIZATION } from 'src/config/config'

const basicAuthorizer: Handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {

	const token = event.authorizationToken.split("Basic ")[ 1 ]
	const decodedToken = Buffer.from(token, 'base64').toString('utf-8')

	const authorizationObj = {
		principalId: 'user',
		policyDocument: {
			Version: '2012-10-17',
			Statement: [
				{
					Action: 'execute-api:Invoke',
					Effect: 'Deny',
					Resource: event.methodArn
				}
			]
		}
	}

	if (decodedToken === AUTHORIZATION.password) {
		authorizationObj.policyDocument.Statement[ 0 ].Effect = 'Allow'
	}

	return authorizationObj
}

export const main = basicAuthorizer
