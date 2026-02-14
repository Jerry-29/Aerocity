package com.aerocity.be.payment.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RazorpayService {

    @Value("${razorpay.api.key}")
    private String API_KEY;

    @Value("${razorpay.api.secret}")
    private String API_SECRET;

    public Order createOrder(BigDecimal amount, String receiptId) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(API_KEY, API_SECRET);
        JSONObject orderRequest = new JSONObject();
        // Razorpay expects amount in paise (multiply by 100)
        orderRequest.put("amount", amount.multiply(new BigDecimal(100)).intValue());
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receiptId);
        
        return razorpayClient.orders.create(orderRequest);
    }
    
    public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) throws RazorpayException {
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);
        
        return Utils.verifyPaymentSignature(options, API_SECRET);
    }
}

