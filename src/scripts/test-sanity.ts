
import { client } from '../lib/sanity';
import { PRODUCTS_QUERY } from '../lib/sanity.queries';

async function testSanity() {
    console.log("Testing Sanity connection...");
    console.log("Project ID:", client.config().projectId);
    console.log("Dataset:", client.config().dataset);

    try {
        const products = await client.fetch(PRODUCTS_QUERY);
        console.log("Successfully fetched products!");
        console.log("Count:", products.length);
        console.log("Products:", JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error fetching from Sanity:", error);
    }
}

testSanity();
