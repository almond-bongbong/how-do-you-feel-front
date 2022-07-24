export interface UploadFileResponse {
  id: number;
  key: string;
  originName: string;
  cdnUrl: string;
  bucketUrl: string;
}

export interface AddressMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface Address {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_3depth_h_name: string;
    h_code: string;
    b_code: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    x: string;
    y: string;
  };
}

export interface AddressListResponse {
  meta: AddressMeta;
  documents: Address[];
}

export interface AddressByKeyword {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface AddressByKeywordListResponse {
  meta: AddressMeta;
  documents: AddressByKeyword[];
}
