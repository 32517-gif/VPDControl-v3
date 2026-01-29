
import { GoogleGenAI } from "@google/genai";
import { SensorData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIPlantAnalysis = async (data: SensorData) => {
  const prompt = `
    Analyze this greenhouse sensor data:
    Temperature: ${data.temperature}°C
    Humidity: ${data.humidity}%
    VPD: ${data.vpd} kPa
    Soil Moisture: ${data.soilMoisture}%

    Context: This is a small experimental greenhouse (20x20x30 cm) using ESP32-C3.
    Target VPD: 0.8 - 1.2 kPa.

    Please provide:
    1. Short status summary (is it healthy?)
    2. Recommended actions for Fan or Misting system.
    3. Potential risks based on current values.

    Keep the response concise and professional, formatted for a dashboard.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Analysis error:", error);
    return "Failed to fetch AI analysis. Check your network or API configuration.";
  }
};
