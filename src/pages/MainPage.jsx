import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Label = styled.label`
    font-weight: bold;
`;

const Input = styled.input`
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Select = styled.select`
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
`;

const Error = styled.p`
    color: red;
    font-size: 14px;
`;

function MainPage() {
    const navigate = useNavigate();
    const [gu] = useState("동작구");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");

    const handleSearch = () => {
        if (!name.trim()) {
            setError("시설명을 입력해주세요.");
            return;
        }
        setError("");
        navigate(
            `/results?gu=${gu}&name=${encodeURIComponent(
                name
            )}&type=${encodeURIComponent(type)}`
        );
    };

    return (
        <Container>
            <h1 style={{ marginBottom: "1.5rem" }}>복지 플러스</h1>
            <Section>
                <div>
                    <Label htmlFor="gu">구 선택</Label>
                    <Select id="gu" value={gu} disabled>
                        <option value="동작구">동작구</option>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="name">
                        시설명 <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 실버센터"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="type">시설 종류명</Label>
                    <Input
                        id="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="예: 노인요양시설"
                    />
                </div>

                {error && <Error>{error}</Error>}

                <Button onClick={handleSearch}>검색</Button>
            </Section>
        </Container>
    );
}

export default MainPage;
