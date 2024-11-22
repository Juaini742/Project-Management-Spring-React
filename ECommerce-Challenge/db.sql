CREATE TABLE users
(
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

-- Membuat index pada kolom email
CREATE INDEX idx_users_email ON users (email);


CREATE TABLE user_profiles
(
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER      NOT NULL,
    first_name    VARCHAR(255) NOT NULL,
    last_name     VARCHAR(255) NOT NULL,
    phone_number  VARCHAR(20),
    date_of_birth DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Membuat index pada kolom user_id
CREATE INDEX idx_user_profiles_user_id ON user_profiles (user_id);

-- Tabel countries
CREATE TABLE countries
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR NOT NULL,
    code       CHAR(2) NOT NULL UNIQUE,
    phone_code VARCHAR
);

-- Tabel addresses
CREATE TABLE addresses
(
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    address_type  VARCHAR NOT NULL, -- Menggunakan tipe enum di aplikasi, direpresentasikan sebagai VARCHAR di PostgreSQL
    address_line1 VARCHAR NOT NULL,
    address_line2 VARCHAR,
    city          VARCHAR NOT NULL,
    state         VARCHAR NOT NULL,
    postal_code   VARCHAR NOT NULL,
    country_id    INTEGER NOT NULL REFERENCES countries (id) ON DELETE CASCADE,
    is_default    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP        DEFAULT NOW(),
    updated_at    TIMESTAMP        DEFAULT NOW(),
    CONSTRAINT user_address_type_unique UNIQUE (user_id, address_type)
);

-- Indexes untuk addresses
CREATE INDEX idx_postal_code ON addresses (postal_code);

----- LIMIT
-- Tabel product_categories
CREATE TABLE product_categories
(
    id                 SERIAL PRIMARY KEY,
    name               VARCHAR        NOT NULL,
    slug               VARCHAR UNIQUE NOT NULL,
    parent_category_id INTEGER, -- Self-referencing property as plain column
    description        TEXT,
    is_active          BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMP               DEFAULT NOW(),
    updated_at         TIMESTAMP               DEFAULT NOW()
);

-- Index untuk product_categories
CREATE INDEX idx_product_categories_slug ON product_categories (slug);
CREATE INDEX idx_product_categories_parent_category_id ON product_categories (parent_category_id);

-- Tabel products

CREATE TABLE products
(
    id          SERIAL PRIMARY KEY,
    sku         VARCHAR UNIQUE NOT NULL,
    name        VARCHAR        NOT NULL,
    slug        VARCHAR UNIQUE NOT NULL,
    description TEXT,
    category_id INTEGER        NOT NULL, -- Foreign key reference not enforced in this design
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP               DEFAULT NOW(),
    updated_at  TIMESTAMP               DEFAULT NOW()
);

-- Index untuk products
CREATE INDEX idx_products_sku ON products (sku);
CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_category_id ON products (category_id);



---- LIMIT ----
-- Tabel product_variants
CREATE TABLE product_variants
(
    id             SERIAL PRIMARY KEY,
    product_id     INTEGER        NOT NULL, -- Foreign key to products.id (optional in this design)
    sku            VARCHAR UNIQUE NOT NULL,
    name           VARCHAR        NOT NULL,
    price          DECIMAL        NOT NULL,
    stock_quantity INTEGER        NOT NULL DEFAULT 0,
    created_at     TIMESTAMP               DEFAULT NOW() NOT NULL,
    updated_at     TIMESTAMP               DEFAULT NOW()
);

CREATE TABLE product_variant_id
(
    id         SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id),
    variant_id INTEGER REFERENCES product_variants (id)
);

-- Indeks untuk product_variants
CREATE INDEX idx_product_variants_product_id ON product_variants (product_id);
CREATE INDEX idx_product_variants_sku ON product_variants (sku);


-- Tabel product_attributes
CREATE TABLE product_attributes
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR                 NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Tabel product_attribute_values
CREATE TABLE product_attribute_values
(
    id           SERIAL PRIMARY KEY,
    attribute_id INTEGER                 NOT NULL, -- Foreign key to product_attributes.id (optional in this design)
    value        VARCHAR                 NOT NULL,
    created_at   TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indeks untuk product_attribute_values
CREATE INDEX idx_product_attribute_values_attribute_id_value
    ON product_attribute_values (attribute_id, value);

---- LIMIT ----
CREATE TABLE product_variant_attributes
(
    id                 SERIAL PRIMARY KEY,
    variant_id         INTEGER NOT NULL REFERENCES product_variants (id),
    attribute_value_id INTEGER NOT NULL REFERENCES product_attribute_values (id),

    CONSTRAINT product_variant_attributes_unique UNIQUE (variant_id, attribute_value_id)
);

CREATE TABLE orders
(
    id                  SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL REFERENCES users (id),
    order_number        VARCHAR NOT NULL UNIQUE,
    status              VARCHAR NOT NULL DEFAULT 'PENDING',
    shipping_address_id INTEGER NOT NULL REFERENCES addresses (id),
    billing_address_id  INTEGER NOT NULL REFERENCES addresses (id),
    subtotal            DECIMAL NOT NULL,
    shipping_cost       DECIMAL NOT NULL,
    tax_amount          DECIMAL NOT NULL,
    total_amount        DECIMAL NOT NULL,
    created_at          TIMESTAMP        DEFAULT now(),
    updated_at          TIMESTAMP        DEFAULT now()
);


CREATE TABLE order_items
(
    id                 SERIAL PRIMARY KEY,
    order_id           INTEGER NOT NULL REFERENCES orders (id),
    product_variant_id INTEGER NOT NULL REFERENCES product_variants (id),
    quantity           INTEGER NOT NULL,
    unit_price         DECIMAL NOT NULL,
    subtotal           DECIMAL NOT NULL,
    created_at         TIMESTAMP DEFAULT now(),

    CONSTRAINT order_items_unique UNIQUE (order_id, product_variant_id)
);

-- Indeks untuk kolom user_id di tabel orders
CREATE INDEX idx_orders_user_id ON orders (user_id);

-- Indeks untuk kolom status di tabel orders
CREATE INDEX idx_orders_status ON orders (status);

-- Indeks untuk kombinasi kolom order_id dan product_variant_id di tabel order_items
CREATE INDEX idx_order_items_order_variant ON order_items (order_id, product_variant_id);


---- LIMIT ---
CREATE TABLE payment_methods
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    code       VARCHAR(50)  NOT NULL UNIQUE,
    is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP             DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE payments
(
    id                SERIAL PRIMARY KEY,
    order_id          INTEGER                             NOT NULL,
    payment_method_id INTEGER                             NOT NULL,
    amount            DECIMAL                             NOT NULL,
    status            VARCHAR(50)                         NOT NULL DEFAULT 'PENDING',
    transaction_id    VARCHAR(255) UNIQUE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_payment_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id)
);

CREATE TABLE shopping_carts
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER                             NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE shopping_cart_items
(
    id                 SERIAL PRIMARY KEY,
    cart_id            INTEGER                             NOT NULL,
    product_variant_id INTEGER                             NOT NULL,
    quantity           INTEGER                             NOT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES shopping_carts (id),
    CONSTRAINT fk_product_variant FOREIGN KEY (product_variant_id) REFERENCES product_variants (id)
);

-- Insert data ke tabel products
INSERT INTO products (sku, name, slug, description, category_id, is_active, created_at, updated_at)
VALUES
    ('P001', 'Product 1', 'product-1', 'Description for Product 1', 1, TRUE, NOW(), NOW()),
    ('P002', 'Product 2', 'product-2', 'Description for Product 2', 1, TRUE, NOW(), NOW()),
    ('P003', 'Product 3', 'product-3', 'Description for Product 3', 2, TRUE, NOW(), NOW()),
    ('P004', 'Product 4', 'product-4', 'Description for Product 4', 2, TRUE, NOW(), NOW()),
    ('P005', 'Product 5', 'product-5', 'Description for Product 5', 3, TRUE, NOW(), NOW()),
    ('P006', 'Product 6', 'product-6', 'Description for Product 6', 3, TRUE, NOW(), NOW()),
    ('P007', 'Product 7', 'product-7', 'Description for Product 7', 4, TRUE, NOW(), NOW()),
    ('P008', 'Product 8', 'product-8', 'Description for Product 8', 4, TRUE, NOW(), NOW()),
    ('P009', 'Product 9', 'product-9', 'Description for Product 9', 5, TRUE, NOW(), NOW()),
    ('P010', 'Product 10', 'product-10', 'Description for Product 10', 5, TRUE, NOW(), NOW()),
    ('P011', 'Product 11', 'product-11', 'Description for Product 11', 6, TRUE, NOW(), NOW()),
    ('P012', 'Product 12', 'product-12', 'Description for Product 12', 6, TRUE, NOW(), NOW());

-- Insert data ke tabel product_variants
INSERT INTO product_variants (product_id, sku, name, price, stock_quantity, created_at, updated_at)
VALUES
    (1, 'P001-V1', 'Variant 1 for Product 1', 100.00, 50, NOW(), NOW()),
    (1, 'P001-V2', 'Variant 2 for Product 1', 120.00, 30, NOW(), NOW()),
    (2, 'P002-V1', 'Variant 1 for Product 2', 150.00, 20, NOW(), NOW()),
    (3, 'P003-V1', 'Variant 1 for Product 3', 200.00, 40, NOW(), NOW()),
    (4, 'P004-V1', 'Variant 1 for Product 4', 250.00, 10, NOW(), NOW()),
    (5, 'P005-V1', 'Variant 1 for Product 5', 180.00, 60, NOW(), NOW()),
    (6, 'P006-V1', 'Variant 1 for Product 6', 220.00, 15, NOW(), NOW()),
    (7, 'P007-V1', 'Variant 1 for Product 7', 140.00, 70, NOW(), NOW()),
    (8, 'P008-V1', 'Variant 1 for Product 8', 160.00, 35, NOW(), NOW()),
    (9, 'P009-V1', 'Variant 1 for Product 9', 130.00, 25, NOW(), NOW()),
    (10, 'P010-V1', 'Variant 1 for Product 10', 170.00, 55, NOW(), NOW()),
    (11, 'P011-V1', 'Variant 1 for Product 11', 210.00, 45, NOW(), NOW()),
    (12, 'P012-V1', 'Variant 1 for Product 12', 230.00, 60, NOW(), NOW());

-- Insert data ke tabel product_variant_id (Relasi produk dan varian produk)
INSERT INTO product_variant_id (product_id, variant_id)
VALUES
    (1, 1), (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (9, 10),
    (10, 11),
    (11, 12);

INSERT INTO product_attributes (name, created_at)
VALUES
    ('Color', NOW()),
    ('Size', NOW()),
    ('Material', NOW());

INSERT INTO product_attribute_values (attribute_id, value, created_at)
VALUES
    -- Atribut Color
    (1, 'Red', NOW()),
    (1, 'Blue', NOW()),
    (1, 'Green', NOW()),
    (1, 'Black', NOW()),

    -- Atribut Size
    (2, 'S', NOW()),
    (2, 'M', NOW()),
    (2, 'L', NOW()),
    (2, 'XL', NOW()),

    -- Atribut Material
    (3, 'Cotton', NOW()),
    (3, 'Polyester', NOW()),
    (3, 'Leather', NOW());

INSERT INTO product_variant_attributes (variant_id, attribute_value_id)
VALUES
    -- Variants for Product 1
    (1, 1), (1, 5), (1, 9),   -- Variant 1 for Product 1: Red, S, Cotton
    (2, 2), (2, 6), (2, 9),   -- Variant 2 for Product 1: Blue, M, Cotton

    -- Variants for Product 2
    (3, 3), (3, 7), (3, 10),  -- Variant 1 for Product 2: Green, L, Polyester

    -- Variants for Product 3
    (4, 4), (4, 6), (4, 11),  -- Variant 1 for Product 3: Black, XL, Leather

    -- Variants for Product 4
    (5, 1), (5, 7), (5, 10),  -- Variant 1 for Product 4: Red, S, Polyester
    (6, 2), (6, 8), (6, 11);  -- Variant 2 for Product 4: Blue, M, Leather


select * from products p
                  join product_variant_id pvi on p.id = pvi.product_id
                  join product_variants pv on pvi.variant_id = pv.id;

-- 10
select * from orders join order_items oi on orders.id = oi.order_id where user_id = 10;