export interface WhopErrorResponse {
  error: {
    status: number;
    message: string;
  };
}

export interface UserMembershipResponse {
  pagination: {
    current_page: number;
    total_page: number;
    total_count: number;
  };
  data: [
    {
      id: string;
      product: string;
      user: string;
      plan: string;
      promo_code: string;
      email: string;
      stripe_subscription_id: string;
      stripe_customer_id: string;
      status: string;
      valid: boolean;
      cancel_at_period_end: boolean;
      payment_processor: "free";
      license_key: string;
      metadata: unknown;
      quantity: number;
      wallet_address: string;
      custom_fields_responses: unknown;
      custom_fields_responses_v2: unknown;
      discord: {
        id: string;
        username: string;
        image_url: string;
      };
      nft_tokens: {
        token_id: string;
        current_holder: string;
        smart_contract: {
          contract_address: string;
          contract_name: string;
        };
        balance: number;
        metadata: unknown;
      };
      expires_at: number;
      renewal_period_start: number;
      renewal_period_end: number;
      created_at: number;
      manage_url: string;
      affiliate_page_url: string;
      checkout_session: string;
      access_pass: string;
      deliveries: unknown;
      telegram_account_id: string;
    }
  ];
}

export interface UserExperiencesResponse {
  pagination: {
    current_page: number;
    total_page: number;
    total_count: number;
  };
  data: [
    {
      id: string;
      experience_type:
        | "discord"
        | "software"
        | "content"
        | "custom"
        | "proxy"
        | "native_content"
        | "app"
        | "zentask"
        | "coffeecard"
        | "courses"
        | "link"
        | "file"
        | "webapp"
        | "telegram"
        | "gpt_plugin"
        | "trading_view"
        | "delivery"
        | "ebook"
        | "has_interface";
      name: string;
      description: string;
      properties: unknown;
      products: string;
      access_passes: string;
    }
  ];
}
