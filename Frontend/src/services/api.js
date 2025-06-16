
class ApiService {
  constructor() {
    // Vite uses import.meta.env instead of process.env
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    this.timeout = 30000; // 30 seconds
  }

  async makeRequest(endpoint, data) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw new Error(error.message || 'Failed to analyze code');
    }
  }

  async analyzeCode(request) {
    const response = await this.makeRequest('/analyze', request);
    
    if (!response.success) {
      throw new Error(response.error || 'Analysis failed');
    }
    
    return response.result;
  }

  async reviewCode(code, language) {
    return this.analyzeCode({ code, language, type: 'review' });
  }

  async explainCode(code, language) {
    return this.analyzeCode({ code, language, type: 'explain' });
  }

  async debugCode(code, language) {
    return this.analyzeCode({ code, language, type: 'debug' });
  }
}

export const apiService = new ApiService();
