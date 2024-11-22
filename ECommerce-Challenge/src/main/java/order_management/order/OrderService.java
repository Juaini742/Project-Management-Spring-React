package order_management.order;


import jakarta.persistence.EntityManager;
import order_management.orderItem.OrderItem;
import order_management.orderItem.OrderItemRepository;
import org.mindrot.jbcrypt.BCrypt;
import product_management.product.Product;
import product_management.product.ProductDisplay;
import product_management.product.ProductRepository;
import product_management.product.ProductVariantDisplay;
import product_management.productVariant.ProductVariant;
import user_management.address.Address;
import user_management.address.AddressRepository;
import user_management.address.AddressService;
import user_management.profile.Profile;
import user_management.profile.ProfileRepository;
import user_management.profile.ProfileService;
import user_management.user.User;
import user_management.user.UserRepository;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;
    private final Scanner scanner = new Scanner(System.in);

    public OrderService(EntityManager entityManager) {
        this.orderRepository = new OrderRepository(entityManager);
        this.productRepository = new ProductRepository(entityManager);
        this.addressRepository = new AddressRepository(entityManager);
        this.orderItemRepository = new OrderItemRepository(entityManager);
    }

    public void detailOrder(User user) {
        List<OrderItem> orderItems = orderRepository.findOrderAndOrderItemByUserId(user.getId());

        if (orderItems.isEmpty()) {
            System.out.println("You don't have any order yet.");
        } else {
            orderItems.forEach(orderItem -> {
                Order order = orderItem.getOrder();
                System.out.println("Order ID: " + order.getId());
                System.out.println("Order Number: " + order.getOrderNumber());
                System.out.println("Order Status: " + order.getStatus());
                System.out.println("Subtotal: " + order.getSubtotal());
                System.out.println("Shipping Cost: " + order.getShippingCost());
                System.out.println("Total Amount: " + order.getTotalAmount());
                System.out.println("Created At: " + order.getCreatedAt());

                System.out.println("Product Variant: " + orderItem.getProductVariant().getName());
                System.out.println("Quantity: " + orderItem.getQuantity());
                System.out.println("Unit Price: " + orderItem.getUnitPrice());
                System.out.println("Subtotal for Item: " + orderItem.getSubtotal());
                System.out.println("-".repeat(30));
            });
        }
    }


    public void showOrderInput(User user) {
        showAllProducts();

        System.out.println("Enter the product number you want to order (enter 0 to cancel):");
        int productChoice = scanner.nextInt();

        if (productChoice == 0) {
            System.out.println("Order canceled.");
            return;
        }

        Product selectedProduct = productRepository.findByProductId(productChoice)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product choice"));

        System.out.println("Enter the product variant number for your choice:");
        List<ProductVariant> variants = selectedProduct.getProductVariant().stream().toList();
        for (int i = 0; i < variants.size(); i++) {
            System.out.println((i + 1) + ". " + variants.get(i).getName() + " - " + variants.get(i).getSku() + " - Price: " + variants.get(i).getPrice());
        }

        int variantChoice = scanner.nextInt();
        if (variantChoice < 1 || variantChoice > variants.size()) {
            System.out.println("Invalid variant choice.");
            return;
        }

        ProductVariant selectedVariant = variants.get(variantChoice - 1);

        System.out.print("Enter the quantity you want to order " + selectedVariant.getName() + " : ");
        int quantity = scanner.nextInt();

        BigDecimal subTotal = selectedVariant.getPrice().multiply(BigDecimal.valueOf(quantity));

        Address address = addressRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Address not found for the user"));

        BigDecimal shippingCost = BigDecimal.valueOf(10.0);
        BigDecimal taxAmount = subTotal.multiply(BigDecimal.valueOf(0.1));
        BigDecimal totalAmount = subTotal.add(shippingCost).add(taxAmount);

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber(generateOrderNumber());
        order.setBillingAddress(address);
        order.setShippingAddress(address);
        order.setSubtotal(subTotal);
        order.setShippingCost(shippingCost);
        order.setTaxAmount(taxAmount);
        order.setTotalAmount(totalAmount);
        order.setStatus(Order.OrderStatus.PENDING);

        orderRepository.save(order);

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProductVariant(selectedVariant);
        orderItem.setQuantity(quantity);
        orderItem.setUnitPrice(selectedVariant.getPrice());
        orderItem.setSubtotal(subTotal);

        orderItemRepository.save(orderItem);
    }

    private String generateOrderNumber() {
        String timestamp = java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        String uniqueId = UUID.randomUUID().toString().split("-")[0];
        return "ORD-" + timestamp + "-" + uniqueId;
    }

    private void showAllProducts() {
        List<Product> productList = productRepository.findAllWithProductVariant();

        System.out.println("=".repeat(30));
        productList.forEach(product -> {
            String category = "Category Name";

            Set<ProductVariantDisplay> productVariants = product.getProductVariant().stream()
                    .map(variant -> new ProductVariantDisplay(
                            variant.getName(),
                            variant.getSku(),
                            variant.getPrice(),
                            variant.getStockQuantity()
                    ))
                    .collect(Collectors.toSet());

            ProductDisplay productDisplay = new ProductDisplay(
                    product.getId(),
                    product.getName(),
                    product.getSku(),
                    product.getSlug(),
                    product.getDescription(),
                    category,
                    productVariants
            );

            System.out.println("Product ID: " + productDisplay.id());
            System.out.println("Product Name: " + productDisplay.productName());
            System.out.println("Product SKU: " + productDisplay.productSku());
            System.out.println("Product Slug: " + productDisplay.productSlug());
            System.out.println("Description: " + productDisplay.productDescription());
            System.out.println("Category: " + productDisplay.productCategory());
            System.out.println("Variants:");

            productDisplay.productVariants().forEach(variant -> {
                System.out.println("  - Variant Name: " + variant.variantName());
                System.out.println("    SKU: " + variant.variantSku());
                System.out.println("    Price: " + variant.variantPrice());
                System.out.println("    Stock Quantity: " + variant.variantStockQuantity());
            });

            System.out.println("-".repeat(30));
        });
    }


}
