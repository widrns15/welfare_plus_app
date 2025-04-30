import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h2`
    margin-bottom: 1.5rem;
`;

const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const InfoItem = styled.p`
    font-size: 15px;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 2rem;
`;

function FacilityDetailPage() {
    const location = useLocation();
    const facility = location.state?.facility;

    useEffect(() => {
        if (!window.kakao?.maps || !facility?.FCLT_ADDR) return;

        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(facility.FCLT_ADDR, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                );
                new window.kakao.maps.Marker({ map, position: coords });
                map.setCenter(coords);
            } else {
                console.warn("주소를 지도에서 찾을 수 없습니다.");
            }
        });
    }, [facility]);

    if (!facility)
        return <Container>시설 정보를 불러올 수 없습니다.</Container>;

    return (
        <Container>
            <Title>{facility.FCLT_NM}</Title>
            <InfoList>
                <InfoItem>
                    <strong>시설 종류:</strong> {facility.FCLT_KIND_NM}
                </InfoItem>
                <InfoItem>
                    <strong>상세 분류:</strong> {facility.FCLT_KIND_DTL_NM}
                </InfoItem>
                <InfoItem>
                    <strong>대표자명:</strong> {facility.RPRSNTV}
                </InfoItem>
                <InfoItem>
                    <strong>주소:</strong> {facility.FCLT_ADDR}
                </InfoItem>
                <InfoItem>
                    <strong>연락처:</strong>{" "}
                    {facility.FCLT_TEL_NO ? (
                        <a href={`tel:${facility.FCLT_TEL_NO}`}>
                            {facility.FCLT_TEL_NO}
                        </a>
                    ) : (
                        "정보 없음"
                    )}
                </InfoItem>
            </InfoList>
            <MapContainer id="map" />
        </Container>
    );
}

export default FacilityDetailPage;

// /// 📁 src/pages/FacilityDetailPage.jsx (카카오 지도 렌더링 적용 완료)
// import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 768px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const Title = styled.h2`
//   margin-bottom: 1.5rem;
// `;

// const InfoList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const InfoItem = styled.p`
//   font-size: 15px;
// `;

// const MapContainer = styled.div`
//   width: 100%;
//   height: 300px;
//   margin-top: 2rem;
// `;

// function FacilityDetailPage() {
//   const location = useLocation();
//   const facility = location.state?.facility;

//   useEffect(() => {
//     if (!facility?.FCLT_ADDR || !window.kakao?.maps) return;

//     const mapContainer = document.getElementById('map');
//     const map = new window.kakao.maps.Map(mapContainer, {
//       center: new window.kakao.maps.LatLng(37.5665, 126.978),
//       level: 3,
//     });

//     const geocoder = new window.kakao.maps.services.Geocoder();
//     geocoder.addressSearch(facility.FCLT_ADDR, function (result, status) {
//       if (status === window.kakao.maps.services.Status.OK) {
//         const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
//         new window.kakao.maps.Marker({ map, position: coords });
//         map.setCenter(coords);
//       } else {
//         console.warn('주소를 지도에서 찾을 수 없습니다:', facility.FCLT_ADDR);
//       }
//     });
//   }, [facility]);

//   if (!facility) return <Container>시설 정보를 불러올 수 없습니다.</Container>;

//   return (
//     <Container>
//       <Title>{facility.FCLT_NM}</Title>
//       <InfoList>
//         <InfoItem><strong>시설 종류:</strong> {facility.FCLT_KIND_NM}</InfoItem>
//         <InfoItem><strong>상세 분류:</strong> {facility.FCLT_KIND_DTL_NM}</InfoItem>
//         <InfoItem><strong>대표자명:</strong> {facility.RPRSNTV}</InfoItem>
//         <InfoItem><strong>주소:</strong> {facility.FCLT_ADDR}</InfoItem>
//         <InfoItem>
//           <strong>연락처:</strong>{' '}
//           {facility.FCLT_TEL_NO ? (
//             <a href={`tel:${facility.FCLT_TEL_NO}`}>{facility.FCLT_TEL_NO}</a>
//           ) : (
//             '정보 없음'
//           )}
//         </InfoItem>
//       </InfoList>
//       <MapContainer id="map" />
//     </Container>
//   );
// }

// export default FacilityDetailPage;
