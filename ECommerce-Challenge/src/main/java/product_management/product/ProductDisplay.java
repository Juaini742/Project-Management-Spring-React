package product_management.product;

import java.util.Set;

public record ProductDisplay(
        Integer id,
        String productName,
        String productSku,
        String productSlug,
        String productDescription,
        String productCategory,
        Set<ProductVariantDisplay> productVariants
) {}