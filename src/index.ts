import { HttpRequest, ResponseBuilder } from "@fermyon/spin-sdk";
require("setimmediate");
import { main } from '../actions/barcode'
import { URL } from "url";

export async function handler(request: HttpRequest, res: ResponseBuilder) {
    let params: any = {};
    try {
        // Extract parameters based on request method and content type
        if (request.method === 'GET') {
            let searchParams = new URL(request.uri).searchParams;

            // Accessing queryParams directly
            console.log(searchParams);

            for (let key in searchParams) {
                let value = searchParams.get(key);
                console.log(`Key: ${key}, Value: ${value}`);
                if (value) {
                    params[key] = value;
                }
            }

        } else if (request.method === 'POST') {
            console.log(request.headers.get('content-type'));
            let contentType = request.headers.get('content-type') || '';
            let body = request.text();
            if (contentType.includes('application/json')) {
                params = JSON.parse(body);
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                console.log(body);

                // Manually parse the URL-encoded string
                let queryParams = body.split('&');
                console.log("queryParams: ", queryParams);
                for (let param of queryParams) {
                    let [key, value] = param.split('=');
                    if (key) {
                        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                        console.log(`Key: ${key}, Value: ${params[key]}`);
                    }
                }
            }
        }

        console.log(`Params passed to main:`, params); // Additional logging

        // Call the main function
        let response: any = await main(params) || {};

        // Determine the response payload
        let payload = response.payload || response.body || '';

        // letruct the response object
        res.status(response.status || 200)
        res.set(response.headers || { "content-type": "text/plain" })
        res.send(payload)

    } catch (error: any) {
        // Handle any errors
        res.status(500)
        res.set({ "content-type": "text/plain" })
        res.send(`Error: ${error.message}`)
    }
}