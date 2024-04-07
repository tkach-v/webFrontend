import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";

type HealthCheckResult = {
  status_code: number;
  detail: string;
  result: string;
}

const HomePage = () => {
  const [checkResult, setCheckResult] = useState<HealthCheckResult | null>(null);

  async function fetchHealthCheck() {
  try {
    const response = await apiClient.get('/health')
    if (response.data) {
      setCheckResult(response.data)
    }
  } catch (error) {
    console.error('API Error:', error)
  }
}

  useEffect(() => {
    fetchHealthCheck();
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <h5>Health check result:</h5>
      <div>Status Code: {checkResult?.status_code}</div>
      <div>Detail: {checkResult?.detail}</div>
      <div>Result: {checkResult?.result}</div>
    </div>
  );
}

export default HomePage
