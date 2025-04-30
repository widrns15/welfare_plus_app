import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
        return <div className="container">시설 정보를 불러올 수 없습니다.</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: "1rem" }}>{facility.FCLT_NM}</h2>

            <div
                className="section"
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
                <p>
                    <strong>시설 종류:</strong> {facility.FCLT_KIND_NM}
                </p>
                <p>
                    <strong>상세 분류:</strong> {facility.FCLT_KIND_DTL_NM}
                </p>
                <p>
                    <strong>대표자명:</strong> {facility.RPRSNTV}
                </p>
                <p>
                    <strong>주소:</strong> {facility.FCLT_ADDR}
                </p>
                <p>
                    <strong>연락처:</strong>{" "}
                    {facility.FCLT_TEL_NO ? (
                        <a href={`tel:${facility.FCLT_TEL_NO}`}>
                            {facility.FCLT_TEL_NO}
                        </a>
                    ) : (
                        "정보 없음"
                    )}
                </p>
            </div>

            <div
                id="map"
                style={{ width: "100%", height: "300px", marginTop: "1.5rem" }}
            ></div>
        </div>
    );
}

export default FacilityDetailPage;
