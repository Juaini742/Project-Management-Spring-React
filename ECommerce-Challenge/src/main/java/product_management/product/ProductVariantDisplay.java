package product_management.product;


import java.math.BigDecimal;

public record ProductVariantDisplay(
        String variantName,
        String variantSku,
        BigDecimal variantPrice,
        Integer variantStockQuantity
) {}