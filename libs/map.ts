import { loadScript } from '@src/libs/element';
import Geocoder = kakao.maps.services.Geocoder;

export const loadKakaoMapScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    loadScript(
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`,
    )
      .then(() => {
        kakao.maps.load(resolve);
      })
      .catch(reject);
  });

type AddressSearchResult = Parameters<Parameters<Geocoder['addressSearch']>[1]>[0];

export const getAddressData = async (address: string): Promise<AddressSearchResult> => {
  await loadKakaoMapScript();
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
};
