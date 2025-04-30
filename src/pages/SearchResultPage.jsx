import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWelfareFacilities } from "../api/welfare";
import styled from "styled-components";

const Container = styled.div`
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h2`
    margin-bottom: 1.5rem;
`;

const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.card};
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.colors.background};
    }
`;

const CardText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const LoadingSkeleton = styled.div`
    background-color: #ddd;
    height: 80px;
    border-radius: 6px;
    margin-bottom: 1rem;
    opacity: 0.5;
`;

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
        <Container>
            <Title>검색 결과</Title>
            {loading ? (
                [...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)
            ) : results.length > 0 ? (
                results.map((item, idx) => (
                    <Card key={idx} onClick={() => handleClick(item)}>
                        <CardText>
                            <strong>{item.FCLT_NM}</strong>
                            <span style={{ fontSize: "14px", color: "#555" }}>
                                {item.FCLT_KIND_NM}
                            </span>
                            <span style={{ fontSize: "13px", color: "#777" }}>
                                {item.FCLT_ADDR || item.REFINE_ROADNM_ADDR}
                            </span>
                        </CardText>
                    </Card>
                ))
            ) : (
                <p>검색 조건에 맞는 결과가 없습니다.</p>
            )}
        </Container>
    );
}

export default SearchResultPage;
