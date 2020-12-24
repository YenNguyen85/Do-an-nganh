package io.yencute.service;

import io.yencute.domain.Bill;
import io.yencute.domain.BillItem;
import io.yencute.repository.BillItemRepository;
import io.yencute.repository.BillRepository;
import io.yencute.security.SecurityUtils;
import io.yencute.service.dto.BillDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {
    private final BillItemRepository billItemRepository;
    private final BillRepository billRepository;

    public BillService(BillItemRepository billItemRepository, BillRepository billRepository){
        this.billItemRepository = billItemRepository;
        this.billRepository = billRepository;
    }

    public void saveCheckout(BillDTO billDTO){
        Bill curBill = new Bill();
        curBill.setStatus(billDTO.getStatus());
        curBill.setPlacedDate(billDTO.getPlacedDate());
        billRepository.save(curBill);

        List<BillItem> billItems = billDTO.getBillItems();
        for (BillItem item: billItems) {
            billItemRepository.save(item);
        }
    }
}
