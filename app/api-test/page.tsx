"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function ApiTestPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, result: any) => {
    setResults(prev => [...prev, { test, result, timestamp: new Date().toISOString() }]);
  };

  const testApiEndpoints = async () => {
    setLoading(true);
    setResults([]);
    
    const token = localStorage.getItem("token");
    addResult("Token Check", { 
      hasToken: !!token, 
      tokenPreview: token ? token.substring(0, 20) + "..." : "No token"
    });

    // Test 1: Basic API health
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json().catch(() => ({}));
      addResult("Health Check", { 
        status: response.status, 
        ok: response.ok, 
        data 
      });
    } catch (error) {
      addResult("Health Check", { error: error.message });
    }

    // Test 2: Profile endpoint without auth
    try {
      const response = await fetch(`${API_URL}/api/v1/user/profile`);
      const data = await response.json().catch(() => ({}));
      addResult("Profile (No Auth)", { 
        status: response.status, 
        ok: response.ok, 
        data 
      });
    } catch (error) {
      addResult("Profile (No Auth)", { error: error.message });
    }

    // Test 3: Profile endpoint with auth (if token exists)
    if (token) {
      try {
        const response = await fetch(`${API_URL}/api/v1/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json().catch(() => ({}));
        addResult("Profile (With Auth)", { 
          status: response.status, 
          ok: response.ok, 
          headers: Object.fromEntries(response.headers.entries()),
          data 
        });
      } catch (error) {
        addResult("Profile (With Auth)", { error: error.message });
      }
    }

    // Test 4: Login endpoint structure
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "invalid"
        }),
      });
      const data = await response.json().catch(() => ({}));
      addResult("Login Test (Invalid Creds)", { 
        status: response.status, 
        ok: response.ok, 
        data 
      });
    } catch (error) {
      addResult("Login Test (Invalid Creds)", { error: error.message });
    }

    // Test 5: Travel endpoint (public)
    try {
      const response = await fetch(`${API_URL}/travel?pageNumber=1&pageSize=1`);
      const data = await response.json().catch(() => ({}));
      addResult("Travel List (Public)", { 
        status: response.status, 
        ok: response.ok, 
        dataStructure: {
          hasCode: 'code' in data,
          hasResponse: 'response' in data,
          hasErrorMessage: 'errorMessage' in data,
          topLevelKeys: Object.keys(data)
        }
      });
    } catch (error) {
      addResult("Travel List (Public)", { error: error.message });
    }

    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `api-test-results-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>API Diagnostics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Button onClick={testApiEndpoints} disabled={loading}>
                {loading ? "Testing..." : "Run API Tests"}
              </Button>
              <Button variant="outline" onClick={clearResults}>
                Clear Results
              </Button>
              {results.length > 0 && (
                <Button variant="outline" onClick={exportResults}>
                  Export Results
                </Button>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>API URL:</strong> {API_URL}</p>
              <p><strong>Current Token:</strong> {localStorage.getItem("token") ? "Present" : "Not found"}</p>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Test Results</h2>
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{result.test}</CardTitle>
                  <p className="text-sm text-gray-500">{result.timestamp}</p>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {JSON.stringify(result.result, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
