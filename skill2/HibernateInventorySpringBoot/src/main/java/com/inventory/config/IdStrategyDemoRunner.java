package com.inventory.config;

import com.inventory.entity.ProductAuto;
import com.inventory.entity.ProductIdentity;
import com.inventory.entity.ProductSequence;
import com.inventory.repository.ProductAutoRepository;
import com.inventory.repository.ProductIdentityRepository;
import com.inventory.repository.ProductSequenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IdStrategyDemoRunner {

    @Bean
    CommandLineRunner runIdStrategyDemo(ProductAutoRepository autoRepository,
                                        ProductIdentityRepository identityRepository,
                                        ProductSequenceRepository sequenceRepository) {
        return args -> {
            if (autoRepository.count() == 0) {
                ProductAuto auto = autoRepository.save(new ProductAuto("AUTO_SAMPLE"));
                System.out.println("AUTO strategy generated id: " + auto.getId());
            }

            if (identityRepository.count() == 0) {
                ProductIdentity identity = identityRepository.save(new ProductIdentity("IDENTITY_SAMPLE"));
                System.out.println("IDENTITY strategy generated id: " + identity.getId());
            }

            if (sequenceRepository.count() == 0) {
                ProductSequence sequence = sequenceRepository.save(new ProductSequence("SEQUENCE_SAMPLE"));
                System.out.println("SEQUENCE strategy generated id: " + sequence.getId());
            }
        };
    }
}
