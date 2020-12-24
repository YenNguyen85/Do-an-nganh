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

    /**
     *  Lưu bill và bill item vào database
     * @param billDTO
     */
    public void saveCheckout(BillDTO billDTO){
        Bill bill = new Bill();
        bill.setStatus(billDTO.getStatus());
        bill.setPlacedDate(billDTO.getPlacedDate());
        Bill curBill = billRepository.save(bill);

        List<BillItem> billItems = billDTO.getBillItems();
        for (BillItem item: billItems) {
            item.setBill(curBill);
            billItemRepository.save(item);
        }
    }
}
