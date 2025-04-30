import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWelfareFacilities } from "../api/welfare";

function SearchResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = new URLSearchParams(location.search);
    const name = query.get("name") || "";
    const type = query.get("type") || "";

    useEffect(() => {
        async function fetchData() {
            const all = await getWelfareFacilities();
            const keyword = decodeURIComponent(name || "").trim();
            const typeword = decodeURIComponent(type || "").trim();

            const filtered = all.filter((item) => {
                const combined = `${item.FCLT_NM ?? ""}${
                    item.FCLT_KIND_NM ?? ""
                }`;
                return (
                    combined.includes(keyword) &&
                    (!typeword || (item.FCLT_KIND_NM ?? "").includes(typeword))
                );
            });

            setResults(filtered);
            setLoading(false);
        }
        fetchData();
    }, [name, type]);

    const handleClick = (item) => {
        navigate(`/facility/${encodeURIComponent(item.FCLT_NM)}`, {
            state: { facility: item },
        });
    };

    return (
        <div className="container">
            <h2>검색 결과</h2>
            {loading ? (
                <div className="section">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                opacity: 0.4,
                                background: "#ddd",
                                height: "80px",
                            }}
                        />
                    ))}
                </div>
            ) : results.length > 0 ? (
                results.map((item, idx) => (
                    <div
                        key={idx}
                        className="card"
                        onClick={() => handleClick(item)}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                            }}
                        >
                            <strong style={{ fontSize: "16px" }}>
                                {item.FCLT_NM}
                            </strong>
                            <span style={{ fontSize: "14px", color: "#555" }}>
                                {item.FCLT_KIND_NM}
                            </span>
                            <span style={{ fontSize: "13px", color: "#777" }}>
                                {item.FCLT_ADDR || item.REFINE_ROADNM_ADDR}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p>검색 조건에 맞는 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default SearchResultPage;
