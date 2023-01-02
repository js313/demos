import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number): { id: string } {
        return this.productService.insertProduct(prodTitle, prodDescription, prodPrice)
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') id: string): Product {
        return this.productService.getAProduct(id)
    }

    @Patch(':id')
    updateAProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') description: string, @Body('price') price: number): Product {
        return this.productService.updateAProduct(id, title, description, price)
    }
}