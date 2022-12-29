import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = []

    insertProduct(title: string, desc: string, price: number): { id: string } {
        const newProduct = new Product(Date.now().toString(), title, desc, price);
        this.products.push(newProduct)
        return { id: newProduct.id }
    }

    getProducts(): Product[] {
        return [...this.products]   //returns a pointer to the products so if this is changed anywhere in the code our products array acting as a DB would change. Thus, copy and then return
    }

    getAProduct(id: string): Product {
        return {
            ...this.products.find(prod => {
                return prod.id === id
            })
        }
    }
}