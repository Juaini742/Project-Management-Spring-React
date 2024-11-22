package user_management.address;


import order_management.order.Order;
import user_management.country.Country;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import user_management.user.User;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", nullable = false)
    private AddressType addressType;

    @Column(name = "address_line1", nullable = false)
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id", nullable = false)
    private Country country;


    @Column(name = "is_default", nullable = false, columnDefinition = "boolean default false")
    private Boolean isDefault;

    @Column(name = "created_at", columnDefinition = "timestamp default now()")
    private Timestamp createdAt;

    @Column(name = "updated_at", columnDefinition = "timestamp default now()")
    private Timestamp updatedAt;

    public enum AddressType {
        HOME,
        WORK,
        BILLING,
        SHIPPING
    }

}
