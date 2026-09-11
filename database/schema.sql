-- ============================================================================
--  VS Electricals — MySQL schema + seed data
-- ----------------------------------------------------------------------------
--  HOW TO RUN
--    1) Open a terminal (or MySQL Workbench) and run this whole file, e.g.:
--         mysql -u root -p < database/schema.sql
--       (in Workbench: File > Open SQL Script > this file > Execute ⚡)
--    2) It creates the `vs_electricals` database, all tables, and seed data.
--    3) Put the same DB name/user/password in your .env.local (see .env.local.example).
--
--  Safe to re-run: it drops and recreates the tables (seed data is reset).
--  Engine: InnoDB, charset utf8mb4 (full Unicode incl. the ₹ symbol & emoji).
-- ============================================================================

CREATE DATABASE IF NOT EXISTS vs_electricals
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vs_electricals;

SET NAMES utf8mb4;

-- Drop in FK-safe order (children first) so the script can be re-run cleanly.
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS newsletter_subscribers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- ----------------------------------------------------------------------------
--  categories
-- ----------------------------------------------------------------------------
CREATE TABLE categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(140) NOT NULL,
  description VARCHAR(400) DEFAULT NULL,
  icon        VARCHAR(40)  DEFAULT 'bolt',   -- maps to an inline SVG icon key
  image_url   VARCHAR(500) DEFAULT NULL,     -- Unsplash base URL (sized in-app)
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
--  products
-- ----------------------------------------------------------------------------
CREATE TABLE products (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id       INT UNSIGNED NOT NULL,
  name              VARCHAR(200) NOT NULL,
  slug              VARCHAR(220) NOT NULL,
  short_description VARCHAR(400) DEFAULT NULL,
  description       TEXT DEFAULT NULL,
  price             DECIMAL(10,2) DEFAULT NULL,   -- NULL = "Request a quote"
  image_url         VARCHAR(500) DEFAULT NULL,
  gallery           JSON DEFAULT NULL,            -- array of image URLs
  features          JSON DEFAULT NULL,            -- array of strings
  specifications    JSON DEFAULT NULL,            -- object of key -> value
  rating            DECIMAL(2,1) DEFAULT NULL,    -- 0.0 - 5.0
  is_featured       TINYINT(1) NOT NULL DEFAULT 0,
  is_new            TINYINT(1) NOT NULL DEFAULT 0,
  stock_status      VARCHAR(20) NOT NULL DEFAULT 'in_stock',  -- in_stock | out_of_stock
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category (category_id),
  KEY idx_products_featured (is_featured),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
--  enquiries  (Request-a-Quote / contact form submissions)
-- ----------------------------------------------------------------------------
CREATE TABLE enquiries (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(190) NOT NULL,
  phone      VARCHAR(40)  NOT NULL,
  product_id INT UNSIGNED DEFAULT NULL,   -- NULL for a general enquiry
  subject    VARCHAR(255) DEFAULT NULL,
  message    TEXT NOT NULL,
  status     ENUM('new','contacted','closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_enquiries_status (status),
  KEY idx_enquiries_product (product_id),
  CONSTRAINT fk_enquiries_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
--  newsletter_subscribers
-- ----------------------------------------------------------------------------
CREATE TABLE newsletter_subscribers (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email      VARCHAR(190) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_newsletter_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
--  SEED: categories
-- ============================================================================
INSERT INTO categories (name, slug, description, icon, image_url, sort_order) VALUES
('Fans', 'fans',
 'Energy-efficient ceiling, table, wall and exhaust fans engineered for silent, powerful airflow.',
 'fan', 'https://images.unsplash.com/photo-1609519479841-5fd3b2884e17', 1),
('LED Lighting', 'led-lighting',
 'Bright, long-life LED bulbs, battens, panels and flood lights that cut your power bills.',
 'bulb', 'https://images.unsplash.com/photo-1529310399831-ed472b81d589', 2),
('Switches & Sockets', 'switches-sockets',
 'Premium modular switches, sockets and plates with a smooth feel and elegant finish.',
 'switch', 'https://images.unsplash.com/photo-1556217994-22de7face210', 3),
('Wires & Cables', 'wires-cables',
 'BIS-certified flame-retardant house wires and multi-core cables for safe installations.',
 'cable', 'https://images.unsplash.com/photo-1610028290816-5d937a395a49', 4),
('Water Heaters', 'water-heaters',
 'Storage, instant and solar water heaters with rust-proof tanks and fast heating.',
 'heater', 'https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69', 5),
('Kitchen Appliances', 'kitchen-appliances',
 'Mixer grinders, induction cooktops, toasters and coffee makers for the modern kitchen.',
 'kitchen', 'https://images.unsplash.com/photo-1556911220-bff31c812dba', 6),
('Home Appliances', 'home-appliances',
 'Air purifiers, coolers and everyday appliances that make your home more comfortable.',
 'appliance', 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d', 7),
('MCBs & Distribution', 'mcb-distribution',
 'MCBs, RCCBs, isolators and distribution boards for reliable circuit protection.',
 'panel', 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5', 8);

-- ============================================================================
--  SEED: products
--  (category_id values match the insert order of categories above: 1..8)
-- ============================================================================

-- ---- 1) Fans -----------------------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(1, 'VS AeroSilent BLDC Ceiling Fan 1200mm', 'vs-aerosilent-bldc-ceiling-fan-1200mm',
 'Super energy-efficient BLDC ceiling fan with remote and 5-speed control.',
 'The AeroSilent runs on a brushless DC motor that uses up to 65% less electricity than an ordinary fan while delivering powerful, silent airflow. It ships with a remote, sleep and boost modes, and aerodynamic blades tuned for even air delivery across the room.',
 3499.00, 'https://images.unsplash.com/photo-1609519479841-5fd3b2884e17',
 '["https://images.unsplash.com/photo-1609519479841-5fd3b2884e17","https://images.unsplash.com/photo-1555470100-1728256970aa","https://images.unsplash.com/photo-1576503963299-fcd31822b523"]',
 '["BLDC motor saves up to 65% power","Remote with 5-speed and sleep mode","Runs on inverter during power cuts","Whisper-silent operation","2-year warranty"]',
 '{"Sweep":"1200 mm","Motor":"BLDC","Power":"28 W","Speed":"350 RPM","Air Delivery":"230 CMM","Warranty":"2 Years"}',
 4.7, 1, 1, 'in_stock'),

(1, 'VS Breeze Pro Ceiling Fan 1200mm', 'vs-breeze-pro-ceiling-fan-1200mm',
 'High-speed ceiling fan with double ball-bearing motor and anti-rust coating.',
 'The Breeze Pro is built for daily performance with a powerful copper motor, dust-resistant paint and precision-balanced blades for wobble-free running that lasts for years.',
 2199.00, 'https://images.unsplash.com/photo-1555470100-1728256970aa',
 '["https://images.unsplash.com/photo-1555470100-1728256970aa","https://images.unsplash.com/photo-1576503963299-fcd31822b523","https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811"]',
 '["100% copper motor","High air delivery 230 CMM","Rust-resistant powder coating","Double ball bearings","2-year warranty"]',
 '{"Sweep":"1200 mm","Motor":"Copper","Power":"72 W","Speed":"370 RPM","Air Delivery":"230 CMM","Warranty":"2 Years"}',
 4.5, 1, 0, 'in_stock'),

(1, 'VS TurboCool Table Fan 400mm', 'vs-turbocool-table-fan-400mm',
 'Portable high-speed table fan with wide oscillation and thermal safety.',
 'A compact table fan with strong airflow, smooth oscillation and a stable base. The thermal overload protector keeps the motor safe during long hours of use.',
 1799.00, 'https://images.unsplash.com/photo-1576503963299-fcd31822b523',
 '["https://images.unsplash.com/photo-1576503963299-fcd31822b523","https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811","https://images.unsplash.com/photo-1609519479841-5fd3b2884e17"]',
 '["Wide oscillation","Thermal overload protection","3-speed control","Stable heavy base","1-year warranty"]',
 '{"Size":"400 mm","Speeds":"3","Power":"55 W","Oscillation":"Yes","Warranty":"1 Year"}',
 4.3, 0, 0, 'in_stock'),

(1, 'VS StormForce Wall Fan 400mm', 'vs-stormforce-wall-fan-400mm',
 'Powerful wall-mounted fan with remote and wide-angle oscillation.',
 'Free up floor space with the StormForce wall fan. High-speed blades and wide oscillation cool large rooms, shops and workshops, all controlled from a handy remote.',
 2099.00, 'https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811',
 '["https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811","https://images.unsplash.com/photo-1555470100-1728256970aa","https://images.unsplash.com/photo-1576503963299-fcd31822b523"]',
 '["Remote controlled","Wide-angle oscillation","High-speed copper motor","Space-saving wall mount","1-year warranty"]',
 '{"Size":"400 mm","Speeds":"3","Power":"60 W","Mount":"Wall","Warranty":"1 Year"}',
 4.4, 0, 0, 'in_stock'),

(1, 'VS FreshAir Exhaust Fan 150mm', 'vs-freshair-exhaust-fan-150mm',
 'Compact exhaust fan for kitchens and bathrooms with low-noise blades.',
 'The FreshAir exhaust fan clears smoke, steam and odours quickly. Its low-noise design and easy-clean grille make it ideal for kitchens, bathrooms and small offices.',
 1099.00, 'https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811',
 '["https://images.unsplash.com/photo-1565184099246-7c2dfcbf5811","https://images.unsplash.com/photo-1609519479841-5fd3b2884e17"]',
 '["High suction airflow","Low-noise operation","Easy-clean grille","Rust-proof body","1-year warranty"]',
 '{"Size":"150 mm","Power":"30 W","Type":"Exhaust","Warranty":"1 Year"}',
 4.2, 0, 0, 'in_stock');

-- ---- 2) LED Lighting ---------------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(2, 'VS BrightLine LED Batten 20W', 'vs-brightline-led-batten-20w',
 'Slim 4-foot LED batten with uniform, flicker-free daylight.',
 'A slim aluminium LED batten that spreads bright, even light with no flicker. Surge-protected and rated for long life, it is a straight upgrade from old tube lights.',
 549.00, 'https://images.unsplash.com/photo-1529310399831-ed472b81d589',
 '["https://images.unsplash.com/photo-1529310399831-ed472b81d589","https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f","https://images.unsplash.com/photo-1552862750-746b8f6f7f25"]',
 '["Flicker-free light","2000 lumens output","Surge protection up to 4kV","Slim aluminium body","2-year warranty"]',
 '{"Wattage":"20 W","Lumens":"2000 lm","Colour":"Cool Daylight 6500K","Length":"4 ft","Warranty":"2 Years"}',
 4.6, 1, 0, 'in_stock'),

(2, 'VS Halo LED Panel 15W Round', 'vs-halo-led-panel-15w-round',
 'Recessed round LED panel for false ceilings with smooth diffused light.',
 'The Halo panel sits flush in false ceilings and casts soft, glare-free light across living rooms, offices and shops. Even illumination with no visible hot spots.',
 649.00, 'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f',
 '["https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f","https://images.unsplash.com/photo-1552862750-746b8f6f7f25","https://images.unsplash.com/photo-1513518647365-91830a8800b3"]',
 '["Glare-free diffused light","Slim recessed design","Energy efficient","Long 25000-hour life","2-year warranty"]',
 '{"Wattage":"15 W","Lumens":"1350 lm","Colour":"Cool White 6500K","Cutout":"150 mm","Warranty":"2 Years"}',
 4.5, 0, 1, 'in_stock'),

(2, 'VS LumaSmart WiFi LED Bulb 9W', 'vs-lumasmart-wifi-led-bulb-9w',
 'App and voice controlled smart bulb with 16 million colours.',
 'Set any colour or white tone, create schedules and control the LumaSmart bulb by app or voice with Alexa and Google Assistant. No hub required.',
 499.00, 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae',
 '["https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae","https://images.unsplash.com/photo-1552862750-746b8f6f7f25","https://images.unsplash.com/photo-1529310399831-ed472b81d589"]',
 '["16 million colours","Works with Alexa and Google","App scheduling and scenes","No hub required","1-year warranty"]',
 '{"Wattage":"9 W","Colours":"16M RGB + White","Connectivity":"WiFi 2.4GHz","Base":"B22","Warranty":"1 Year"}',
 4.4, 1, 1, 'in_stock'),

(2, 'VS ClassicGlow LED Bulb 9W (Pack of 4)', 'vs-classicglow-led-bulb-9w-pack-of-4',
 'Value pack of 4 bright cool-white LED bulbs with surge protection.',
 'Everyday LED bulbs that give bright, comfortable light and long life. This value pack of four is perfect for lighting up the whole home affordably.',
 399.00, 'https://images.unsplash.com/photo-1552862750-746b8f6f7f25',
 '["https://images.unsplash.com/photo-1552862750-746b8f6f7f25","https://images.unsplash.com/photo-1529310399831-ed472b81d589","https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae"]',
 '["Pack of 4 bulbs","Bright 800 lumens each","Surge protection up to 4kV","Low power consumption","1-year warranty"]',
 '{"Wattage":"9 W","Lumens":"800 lm","Colour":"Cool Daylight 6500K","Base":"B22","Pack":"4 Bulbs","Warranty":"1 Year"}',
 4.5, 0, 0, 'in_stock'),

(2, 'VS StreetGuard LED Flood Light 50W', 'vs-streetguard-led-flood-light-50w',
 'Weatherproof IP66 flood light for outdoors, gates and facades.',
 'A rugged die-cast flood light built for the outdoors. IP66 weatherproofing and a wide beam make it ideal for gates, parking, signage and building facades.',
 1599.00, 'https://images.unsplash.com/photo-1513518647365-91830a8800b3',
 '["https://images.unsplash.com/photo-1513518647365-91830a8800b3","https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f","https://images.unsplash.com/photo-1529310399831-ed472b81d589"]',
 '["IP66 weatherproof","Wide flood beam","Die-cast aluminium body","Surge protected","2-year warranty"]',
 '{"Wattage":"50 W","Lumens":"4500 lm","Rating":"IP66","Colour":"Cool White 6500K","Warranty":"2 Years"}',
 4.6, 0, 0, 'in_stock');

-- ---- 3) Switches & Sockets ---------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(3, 'VS Modula Modular Switch 16A', 'vs-modula-modular-switch-16a',
 'Premium 1-way modular switch with a smooth, silent click.',
 'The Modula switch feels premium every time you press it, with a soft silent click and a scratch-resistant finish that stays looking new for years.',
 149.00, 'https://images.unsplash.com/photo-1556217994-22de7face210',
 '["https://images.unsplash.com/photo-1556217994-22de7face210","https://images.unsplash.com/photo-1520254695104-2765bc239df7","https://images.unsplash.com/photo-1623707430101-9e74cefe05e2"]',
 '["Silent soft-click mechanism","Scratch-resistant finish","Shock-proof polycarbonate","Fits standard modular plates","5-year warranty"]',
 '{"Rating":"16 A","Type":"1-Way","Modules":"1M","Material":"Polycarbonate","Warranty":"5 Years"}',
 4.5, 1, 0, 'in_stock'),

(3, 'VS Modula 2-Way Switch 16A', 'vs-modula-2-way-switch-16a',
 'Two-way modular switch to control one light from two points.',
 'Control a staircase or bedroom light from two locations. The Modula 2-way switch shares the same premium feel and finish as the rest of the range.',
 189.00, 'https://images.unsplash.com/photo-1520254695104-2765bc239df7',
 '["https://images.unsplash.com/photo-1520254695104-2765bc239df7","https://images.unsplash.com/photo-1556217994-22de7face210","https://images.unsplash.com/photo-1567893329477-0d210fa97715"]',
 '["Two-way control","Silent operation","Scratch-resistant finish","Shock-proof body","5-year warranty"]',
 '{"Rating":"16 A","Type":"2-Way","Modules":"1M","Material":"Polycarbonate","Warranty":"5 Years"}',
 4.4, 0, 0, 'in_stock'),

(3, 'VS PowerPoint 6A/16A Universal Socket', 'vs-powerpoint-universal-socket',
 'Universal socket that accepts 2, 3 and multi-pin plugs safely.',
 'One socket for every plug. The PowerPoint universal socket has protective shutters and a strong grip that keeps connections secure.',
 249.00, 'https://images.unsplash.com/photo-1623707430101-9e74cefe05e2',
 '["https://images.unsplash.com/photo-1623707430101-9e74cefe05e2","https://images.unsplash.com/photo-1567893329477-0d210fa97715","https://images.unsplash.com/photo-1556217994-22de7face210"]',
 '["Accepts 2 and 3 pin plugs","Safety shutters","Strong plug grip","6A and 16A combined","5-year warranty"]',
 '{"Rating":"6A / 16A","Type":"Universal","Modules":"2M","Safety":"Shuttered","Warranty":"5 Years"}',
 4.5, 0, 0, 'in_stock'),

(3, 'VS Modula USB Charging Socket', 'vs-modula-usb-charging-socket',
 'Modular wall plate with dual USB-A and USB-C fast charging.',
 'Charge phones and tablets directly from the wall without a bulky adaptor. Dual USB-A and USB-C outputs deliver fast, safe charging in a slim modular fit.',
 699.00, 'https://images.unsplash.com/photo-1567893329477-0d210fa97715',
 '["https://images.unsplash.com/photo-1567893329477-0d210fa97715","https://images.unsplash.com/photo-1623707430101-9e74cefe05e2","https://images.unsplash.com/photo-1520254695104-2765bc239df7"]',
 '["USB-A and USB-C outputs","Fast charging up to 3.4A","Over-current protection","Slim 2M modular fit","2-year warranty"]',
 '{"Output":"5V 3.4A","Ports":"USB-A + USB-C","Modules":"2M","Protection":"Over-current","Warranty":"2 Years"}',
 4.3, 0, 1, 'in_stock');

-- ---- 4) Wires & Cables -------------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(4, 'VS FlameGuard FR House Wire 1.5 sq mm (90m)', 'vs-flameguard-fr-house-wire-1-5-sqmm-90m',
 'Flame-retardant FR house wire with 99.97% pure electrolytic copper.',
 'FlameGuard FR wire is built for safety with high-purity copper conductors and flame-retardant insulation that resists heat and slows the spread of fire. Ideal for lighting and general home wiring.',
 1650.00, 'https://images.unsplash.com/photo-1610028290816-5d937a395a49',
 '["https://images.unsplash.com/photo-1610028290816-5d937a395a49","https://images.unsplash.com/photo-1555963966-b7ae5404b6ed","https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4"]',
 '["99.97% pure copper","Flame-retardant insulation","Heat and moisture resistant","ISI marked","90-metre coil"]',
 '{"Size":"1.5 sq mm","Length":"90 m","Conductor":"Electrolytic Copper","Insulation":"FR PVC","Voltage":"1100 V","Use":"Lighting circuits"}',
 4.7, 1, 0, 'in_stock'),

(4, 'VS FlameGuard FR House Wire 2.5 sq mm (90m)', 'vs-flameguard-fr-house-wire-2-5-sqmm-90m',
 'Heavier 2.5 sq mm FR wire for power sockets and heavy appliances.',
 'The 2.5 sq mm FlameGuard wire carries higher loads safely, making it the right choice for power sockets, air conditioners and other heavy appliances.',
 2750.00, 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed',
 '["https://images.unsplash.com/photo-1555963966-b7ae5404b6ed","https://images.unsplash.com/photo-1610028290816-5d937a395a49","https://images.unsplash.com/photo-1595856898575-9d187bd32fd6"]',
 '["High current capacity","99.97% pure copper","Flame-retardant insulation","ISI marked","90-metre coil"]',
 '{"Size":"2.5 sq mm","Length":"90 m","Conductor":"Electrolytic Copper","Insulation":"FR PVC","Voltage":"1100 V","Use":"Power sockets"}',
 4.7, 0, 0, 'in_stock'),

(4, 'VS PowerFlex 3-Core Flexible Cable 1.5 sq mm', 'vs-powerflex-3-core-flexible-cable-1-5-sqmm',
 'Flexible 3-core copper cable for appliances and extensions. Sold per requirement.',
 'A tough, flexible 3-core cable for appliance leads, extension boards and industrial use. Ordered by length to suit your project, so request a quote for your exact requirement.',
 NULL, 'https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4',
 '["https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4","https://images.unsplash.com/photo-1595856898575-9d187bd32fd6","https://images.unsplash.com/photo-1610028290816-5d937a395a49"]',
 '["3-core flexible design","Fine stranded copper","Tough abrasion-resistant sheath","Custom lengths available","ISI marked"]',
 '{"Size":"1.5 sq mm","Cores":"3","Conductor":"Flexible Copper","Sheath":"PVC","Voltage":"1100 V","Sold By":"Per metre"}',
 4.5, 0, 0, 'out_of_stock'),

(4, 'VS CoaxPro TV Coaxial Cable (20m)', 'vs-coaxpro-tv-coaxial-cable-20m',
 'Low-loss coaxial cable for clear cable TV and antenna signals.',
 'A shielded coaxial cable that delivers crisp cable TV and antenna signals with minimal loss and strong interference rejection.',
 899.00, 'https://images.unsplash.com/photo-1595856898575-9d187bd32fd6',
 '["https://images.unsplash.com/photo-1595856898575-9d187bd32fd6","https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4","https://images.unsplash.com/photo-1555963966-b7ae5404b6ed"]',
 '["Low signal loss","Double shielding","Corrosion-resistant connectors","20-metre length","1-year warranty"]',
 '{"Type":"RG-6 Coaxial","Length":"20 m","Impedance":"75 Ohm","Shielding":"Double","Warranty":"1 Year"}',
 4.2, 0, 0, 'in_stock');

-- ---- 5) Water Heaters --------------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(5, 'VS AquaWarm Storage Water Heater 15L', 'vs-aquawarm-storage-water-heater-15l',
 'Rust-proof 15L geyser with multi-layer safety and fast heating.',
 'The AquaWarm 15L is ideal for bathrooms and small families. A glass-lined tank resists rust while multiple safety cut-offs protect against overheating and dry running.',
 8499.00, 'https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69',
 '["https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69","https://images.unsplash.com/photo-1607472586893-edb57bdc0e39","https://images.unsplash.com/photo-1606340671662-27ee685dd111"]',
 '["Glass-lined rust-proof tank","Multi-level safety cut-off","High-density insulation","Suitable for high-rise pressure","5-year tank warranty"]',
 '{"Capacity":"15 L","Power":"2000 W","Pressure":"8 Bar","Tank":"Glass-lined","Warranty":"5 Years Tank / 2 Years Product"}',
 4.6, 1, 0, 'in_stock'),

(5, 'VS AquaWarm Storage Water Heater 25L', 'vs-aquawarm-storage-water-heater-25l',
 'Larger 25L geyser for families with quick reheat and safety valve.',
 'A 25-litre storage heater for larger families and kitchens. Thick insulation keeps water hot for longer, and a pressure-release valve adds another layer of safety.',
 9999.00, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39',
 '["https://images.unsplash.com/photo-1607472586893-edb57bdc0e39","https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69","https://images.unsplash.com/photo-1615238168577-0970b17e4a5f"]',
 '["25-litre capacity","Glass-lined rust-proof tank","Pressure-release safety valve","Thick PUF insulation","5-year tank warranty"]',
 '{"Capacity":"25 L","Power":"2000 W","Pressure":"8 Bar","Tank":"Glass-lined","Warranty":"5 Years Tank / 2 Years Product"}',
 4.5, 0, 0, 'in_stock'),

(5, 'VS InstaHot Instant Water Heater 3L', 'vs-instahot-instant-water-heater-3l',
 'Compact instant geyser that heats water in seconds for kitchens.',
 'The InstaHot 3L delivers hot water on demand within seconds, perfect for kitchens and small bathrooms. Its copper heating element resists corrosion for a long life.',
 3299.00, 'https://images.unsplash.com/photo-1606340671662-27ee685dd111',
 '["https://images.unsplash.com/photo-1606340671662-27ee685dd111","https://images.unsplash.com/photo-1615238168577-0970b17e4a5f","https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69"]',
 '["Instant hot water","Copper heating element","Thermal cut-out safety","Compact wall-mount design","2-year warranty"]',
 '{"Capacity":"3 L","Power":"3000 W","Element":"Copper","Mount":"Wall","Warranty":"2 Years"}',
 4.4, 1, 1, 'in_stock'),

(5, 'VS SolarMax Water Heater 100L', 'vs-solarmax-water-heater-100l',
 'Evacuated-tube solar water heater for year-round free hot water. Request a quote.',
 'Cut your water heating bills to near zero with the SolarMax 100L. Evacuated glass tubes capture heat even on cloudy days. Installation varies by rooftop, so request a tailored quote.',
 NULL, 'https://images.unsplash.com/photo-1615238168577-0970b17e4a5f',
 '["https://images.unsplash.com/photo-1615238168577-0970b17e4a5f","https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69","https://images.unsplash.com/photo-1607472586893-edb57bdc0e39"]',
 '["Evacuated-tube technology","Works on cloudy days","Near-zero running cost","Stainless steel tank","Installation support included"]',
 '{"Capacity":"100 L","Type":"Evacuated Tube","Tank":"Stainless Steel","Backup":"Optional Electric","Warranty":"5 Years"}',
 4.5, 0, 0, 'out_of_stock');

-- ---- 6) Kitchen Appliances ---------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(6, 'VS MixMaster Mixer Grinder 750W', 'vs-mixmaster-mixer-grinder-750w',
 'Powerful 750W mixer grinder with 3 stainless steel jars.',
 'The MixMaster tackles everyday grinding, blending and juicing with a strong 750W motor, three stainless steel jars and overload protection for peace of mind.',
 3499.00, 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
 '["https://images.unsplash.com/photo-1556911220-bff31c812dba","https://images.unsplash.com/photo-1570222094114-d054a817e56b","https://images.unsplash.com/photo-1596552183299-000ef779e88d"]',
 '["Powerful 750W motor","3 stainless steel jars","Overload protection","Anti-skid feet","2-year warranty"]',
 '{"Power":"750 W","Jars":"3","Speeds":"3 + Pulse","Body":"ABS","Warranty":"2 Years"}',
 4.5, 1, 0, 'in_stock'),

(6, 'VS BrewPerfect Drip Coffee Maker', 'vs-brewperfect-drip-coffee-maker',
 'Automatic drip coffee maker with reusable filter and keep-warm plate.',
 'Wake up to fresh coffee. The BrewPerfect brews up to 6 cups, keeps them warm on the hot plate and uses a washable reusable filter so there is nothing to replace.',
 2799.00, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b',
 '["https://images.unsplash.com/photo-1570222094114-d054a817e56b","https://images.unsplash.com/photo-1596552183299-000ef779e88d","https://images.unsplash.com/photo-1543503103-f94a0036ed9d"]',
 '["Brews up to 6 cups","Reusable washable filter","Keep-warm hot plate","Anti-drip valve","1-year warranty"]',
 '{"Capacity":"6 Cups","Power":"600 W","Filter":"Reusable","Carafe":"Glass","Warranty":"1 Year"}',
 4.3, 0, 1, 'in_stock'),

(6, 'VS ToastPro 2-Slice Toaster', 'vs-toastpro-2-slice-toaster',
 'Pop-up toaster with 6 browning levels and removable crumb tray.',
 'Perfect toast every time with six browning levels, wide slots for thick bread and a removable crumb tray that keeps things tidy.',
 1699.00, 'https://images.unsplash.com/photo-1596552183299-000ef779e88d',
 '["https://images.unsplash.com/photo-1596552183299-000ef779e88d","https://images.unsplash.com/photo-1543503103-f94a0036ed9d","https://images.unsplash.com/photo-1556911220-bff31c812dba"]',
 '["6 browning levels","Wide slots for thick bread","Removable crumb tray","Cancel and reheat functions","1-year warranty"]',
 '{"Slices":"2","Power":"800 W","Levels":"6","Body":"Stainless Steel","Warranty":"1 Year"}',
 4.4, 0, 0, 'in_stock'),

(6, 'VS HeatWave Induction Cooktop 2000W', 'vs-heatwave-induction-cooktop-2000w',
 'Touch-control induction cooktop with preset menus and timer.',
 'Cook faster and safer with the HeatWave induction cooktop. Preset Indian menus, a cooking timer and auto shut-off make everyday cooking effortless and efficient.',
 2999.00, 'https://images.unsplash.com/photo-1543503103-f94a0036ed9d',
 '["https://images.unsplash.com/photo-1543503103-f94a0036ed9d","https://images.unsplash.com/photo-1556911220-bff31c812dba","https://images.unsplash.com/photo-1570222094114-d054a817e56b"]',
 '["Preset Indian menus","Touch controls with timer","Auto shut-off safety","Energy efficient heating","2-year warranty"]',
 '{"Power":"2000 W","Control":"Touch","Presets":"8","Surface":"Crystal Glass","Warranty":"2 Years"}',
 4.5, 1, 0, 'in_stock');

-- ---- 7) Home Appliances ------------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(7, 'VS PureAir Air Purifier', 'vs-pureair-air-purifier',
 'True HEPA air purifier for rooms up to 400 sq ft with air-quality display.',
 'The PureAir removes dust, pollen, smoke and odours with a true HEPA and activated-carbon filter. A live air-quality indicator and quiet sleep mode keep your air clean day and night.',
 9499.00, 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d',
 '["https://images.unsplash.com/photo-1556909212-d5b604d0c90d","https://images.unsplash.com/photo-1588854337115-1c67d9247e4d"]',
 '["True HEPA + carbon filter","Covers up to 400 sq ft","Live air-quality indicator","Quiet sleep mode","1-year warranty"]',
 '{"Coverage":"400 sq ft","Filter":"HEPA + Carbon","CADR":"350 m3/h","Noise":"Low 30 dB","Warranty":"1 Year"}',
 4.6, 1, 1, 'in_stock'),

(7, 'VS CoolBreeze Air Cooler 55L', 'vs-coolbreeze-air-cooler-55l',
 'Large 55L desert air cooler with honeycomb pads and remote.',
 'Powerful cooling for large rooms. The CoolBreeze uses honeycomb cooling pads for a colder breeze, a 55-litre tank for long runtimes and a handy remote.',
 8999.00, 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d',
 '["https://images.unsplash.com/photo-1588854337115-1c67d9247e4d","https://images.unsplash.com/photo-1556909212-d5b604d0c90d"]',
 '["55-litre tank","Honeycomb cooling pads","Remote control","Castor wheels for easy movement","1-year warranty"]',
 '{"Tank":"55 L","Air Throw":"45 ft","Speeds":"3","Pads":"Honeycomb","Warranty":"1 Year"}',
 4.4, 0, 0, 'in_stock');

-- ---- 8) MCBs & Distribution --------------------------------------------------
INSERT INTO products
  (category_id, name, slug, short_description, description, price, image_url, gallery, features, specifications, rating, is_featured, is_new, stock_status)
VALUES
(8, 'VS SecureTrip MCB 32A Single Pole', 'vs-securetrip-mcb-32a-single-pole',
 'C-curve miniature circuit breaker with fast, reliable trip protection.',
 'The SecureTrip MCB protects circuits from overloads and short circuits with a fast C-curve trip. Its silver alloy contacts ensure a long, reliable service life.',
 199.00, 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5',
 '["https://images.unsplash.com/photo-1544724569-5f546fd6f2b5","https://images.unsplash.com/photo-1635335874521-7987db781153","https://images.unsplash.com/photo-1576446470246-499c738d1c8e"]',
 '["Fast C-curve tripping","Silver alloy contacts","10kA breaking capacity","DIN-rail mount","2-year warranty"]',
 '{"Current":"32 A","Poles":"Single","Curve":"C","Breaking Capacity":"10 kA","Warranty":"2 Years"}',
 4.7, 1, 0, 'in_stock'),

(8, 'VS SecureTrip RCCB 40A Double Pole', 'vs-securetrip-rccb-40a-double-pole',
 'Residual current breaker that guards against electric shock and leakage.',
 'An essential safety device, the SecureTrip RCCB instantly disconnects power on detecting earth leakage, protecting your family from electric shock and fire risk.',
 1299.00, 'https://images.unsplash.com/photo-1635335874521-7987db781153',
 '["https://images.unsplash.com/photo-1635335874521-7987db781153","https://images.unsplash.com/photo-1607631697491-61972eecf928","https://images.unsplash.com/photo-1544724569-5f546fd6f2b5"]',
 '["30mA leakage protection","Guards against shock","Test button included","DIN-rail mount","2-year warranty"]',
 '{"Current":"40 A","Poles":"Double","Sensitivity":"30 mA","Type":"AC","Warranty":"2 Years"}',
 4.6, 0, 0, 'in_stock'),

(8, 'VS DistriBox 8-Way Distribution Board', 'vs-distribox-8-way-distribution-board',
 'Metal distribution board for neat, safe organisation of MCBs.',
 'Organise and protect your home circuits in one place. The DistriBox houses up to 8 MCBs behind a powder-coated metal door with clear circuit labelling.',
 1499.00, 'https://images.unsplash.com/photo-1576446470246-499c738d1c8e',
 '["https://images.unsplash.com/photo-1576446470246-499c738d1c8e","https://images.unsplash.com/photo-1544724569-5f546fd6f2b5","https://images.unsplash.com/photo-1635335874521-7987db781153"]',
 '["Holds up to 8 modules","Powder-coated metal body","Lockable door","Clear circuit labels","2-year warranty"]',
 '{"Ways":"8","Type":"Single Door","Material":"Powder-coated Steel","Mount":"Surface","Warranty":"2 Years"}',
 4.5, 0, 0, 'in_stock'),

(8, 'VS SecureTrip Isolator 63A Double Pole', 'vs-securetrip-isolator-63a-double-pole',
 'Main isolator switch to safely disconnect the whole circuit.',
 'The SecureTrip isolator lets you cut power to the entire board safely for maintenance. Rugged contacts handle high current without heating.',
 449.00, 'https://images.unsplash.com/photo-1607631697491-61972eecf928',
 '["https://images.unsplash.com/photo-1607631697491-61972eecf928","https://images.unsplash.com/photo-1576446470246-499c738d1c8e","https://images.unsplash.com/photo-1544724569-5f546fd6f2b5"]',
 '["Full-circuit isolation","High 63A current rating","Cool-running contacts","DIN-rail mount","2-year warranty"]',
 '{"Current":"63 A","Poles":"Double","Function":"Isolator","Mount":"DIN-rail","Warranty":"2 Years"}',
 4.4, 0, 0, 'in_stock');

-- ============================================================================
--  Optional: a couple of sample rows for the write-tables (commented out).
--  The app inserts these itself via /api/enquiries and /api/newsletter.
-- ============================================================================
-- INSERT INTO enquiries (name, email, phone, product_id, subject, message)
--   VALUES ('Test User', 'test@example.com', '+91 90000 00000', 1,
--           'Enquiry about AeroSilent Fan', 'Please share best price and delivery time.');
-- INSERT INTO newsletter_subscribers (email) VALUES ('subscriber@example.com');

-- ============================================================================
--  EXAMPLE QUERIES  (these mirror what the app runs in src/lib/queries.js)
-- ============================================================================

-- All categories with a live product count:
--   SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
--   FROM categories c ORDER BY c.sort_order;

-- Featured products for the homepage:
--   SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
--   FROM products p JOIN categories c ON c.id = p.category_id
--   WHERE p.is_featured = 1 ORDER BY p.rating DESC LIMIT 8;

-- Products in a category (e.g. fans), price low to high:
--   SELECT p.* FROM products p JOIN categories c ON c.id = p.category_id
--   WHERE c.slug = 'fans' ORDER BY p.price ASC;

-- Search products by keyword:
--   SELECT p.* FROM products p JOIN categories c ON c.id = p.category_id
--   WHERE p.name LIKE '%led%' OR p.short_description LIKE '%led%' OR c.name LIKE '%led%';

-- One product by slug (product detail page):
--   SELECT p.*, c.name AS category_name, c.slug AS category_slug
--   FROM products p JOIN categories c ON c.id = p.category_id
--   WHERE p.slug = 'vs-aerosilent-bldc-ceiling-fan-1200mm';

-- Newest enquiries first (simple admin view):
--   SELECT e.*, p.name AS product_name FROM enquiries e
--   LEFT JOIN products p ON p.id = e.product_id ORDER BY e.created_at DESC;

-- Mark an enquiry as contacted:
--   UPDATE enquiries SET status = 'contacted' WHERE id = 1;

-- ============================================================================
--  Done. Verify with:  SELECT COUNT(*) FROM products;   -- expect 32
-- ============================================================================
