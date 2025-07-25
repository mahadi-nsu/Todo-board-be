import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { generateBadRequestExample, generateNotFoundExample } from "../utils/generate-open-api-example";
import { CategoriesService } from "./categories.service";
import { InsertCategoriesDto, SelectCategoriesDto, UpdateCategoriesDto } from "./schema";

@Controller("categories")
@ApiTags("Categories Section")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: SelectCategoriesDto, description: "Create category" })
  @ApiBadRequestResponse(generateBadRequestExample(InsertCategoriesDto.schema))
  createCategory(@Body() body: InsertCategoriesDto) {
    return this.categoriesService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [SelectCategoriesDto], description: "Get all categories" })
  getAll() {
    return this.categoriesService.getAll();
  }

  @Patch(":id")
  @ApiOkResponse({ type: SelectCategoriesDto, description: "Update category" })
  @ApiBadRequestResponse(generateBadRequestExample(UpdateCategoriesDto.schema))
  @ApiNotFoundResponse(generateNotFoundExample("Category"))
  updateCategory(@Param("id") id: string, @Body() body: UpdateCategoriesDto) {
    return this.categoriesService.update(id, body);
  }

  @Patch(":id/swap-order/:categoryId2")
  @ApiOkResponse({ description: "Swap order of two categories" })
  swapOrder(@Param("id") id: string, @Param("categoryId2") categoryId2: string) {
    return this.categoriesService.swapOrder(id, categoryId2);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "Delete category" })
  @ApiNotFoundResponse(generateNotFoundExample("Category"))
  deleteCategory(@Param("id") id: string, @Query("moveExistingTicketsToCategoryId") moveExistingTicketsToCategoryId?: string) {
    return this.categoriesService.delete(id, moveExistingTicketsToCategoryId);
  }
}
