import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = []

    private findAProduct(id: string): Product {
        return this.products.find(prod => {
            return prod.id === id
        })
    }

    insertProduct(title: string, desc: string, price: number): { id: string } {
        const newProduct = new Product(Date.now().toString(), title, desc, price);
        this.products.push(newProduct)
        return { id: newProduct.id }
    }

    getProducts(): Product[] {
        return [...this.products]   //returns a pointer to the products so if this is changed anywhere in the code our products array acting as a DB would change. Thus, copy and then return
    }

    getAProduct(id: string): Product {
        const product = { ...this.findAProduct(id) }
        if (!product)
            throw new NotFoundException("Product not found.")
        return product
    }

    updateAProduct(id: string, title: string, description: string, price: number): Product {
        const product = this.findAProduct(id)
        if (!product) {
            throw new NotFoundException("Product not found")
        }
        title ? product.title = title : null
        description ? product.description = description : null
        price ? product.price = price : null
        return { ...product }
    }
}