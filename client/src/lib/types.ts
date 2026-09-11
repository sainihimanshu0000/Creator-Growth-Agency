export type InquiryType = "brand" | "creator";
export type InquiryStatus = "new" | "read" | "archived";

export interface BrandInquiryPayload {
  type: "brand";
  name: string;
  company: string;
  email: string;
  whatsapp?: string;
  industry: string;
  brief: string;
}

export interface CreatorInquiryPayload {
  type: "creator";
  channelName: string;
  email: string;
  platform: string;
  followers: string;
  youtube?: string;
  instagram?: string;
  interest: string;
  details: string;
}

export type InquiryPayload = BrandInquiryPayload | CreatorInquiryPayload;

export type Inquiry = InquiryPayload & {
  id: string;
  status: InquiryStatus;
  createdAt: string;
};
