"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Phone, MessageCircle, Clock } from "lucide-react";
import Navbar from '../components/Navbar';
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://back-cursos.onrender.com"
    : "http://localhost:5000";

export default function WhatsAppSearch() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const keywordRefs = useRef([]);

  const filteredIndexes = useMemo(() => {
    if (!searchKeyword.trim()) return [];
    return messages
      .map((msg, i) => {
        const content = `${msg.message} ${msg.contact_name}`.toLowerCase();
        return content.includes(searchKeyword.toLowerCase()) ? i : -1;
      })
      .filter((i) => i !== -1);
  }, [messages, searchKeyword]);

  useEffect(() => {
    if (filteredIndexes.length > 0) {
      const firstIndex = filteredIndexes[0];
      keywordRefs.current[firstIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [filteredIndexes]);

const searchConversations = async () => {
  if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, "").length < 8) {
    setError("El número debe tener al menos 8 dígitos.");
    return;
  }

  setLoading(true);
  setError("");
  setHasSearched(true);

  try {
    const cleanPhone = phoneNumber.replace(/\s+/g, "").replace(/[^\d]/g, "");
    const response = await fetch(`${API_BASE_URL}/api/search/conversations/partial/${cleanPhone}`);

    if (!response.ok) {
      const errorData = await response.json(); // 👈 leemos el mensaje del back
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const sortedMessages = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // orden de viejo a nuevo
    setMessages(sortedMessages);
  } catch (err) {
    setError(err.message || "Error al buscar conversaciones");
    setMessages([]);
  } finally {
    setLoading(false);
  }
};



  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("es-AR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === "Enter") {
      searchConversations();
    }
  };

  return (
     <>
      <Navbar
      />
    <div className="min-h-screen bg-white mt-20 pt-5">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-900">
            <MessageCircle className="h-8 w-8 text-green-600" />
            Buscador de Conversaciones WhatsApp
          </h1>
          <p className="text-gray-700">
            Busca conversaciones por número y palabra clave
          </p>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-4 space-y-3 shadow-sm bg-white">
          <label className="font-semibold flex items-center gap-2 text-gray-900">
            <Phone className="w-5 h-5" /> Número de teléfono
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: 34635974132"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyDown={handlePhoneKeyDown}
              className="border-2 border-gray-300 px-3 py-2 rounded flex-1 bg-white text-gray-900 focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={searchConversations}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {messages.length > 0 && (
          <div className="border-2 border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-2">
            <label className="font-semibold flex items-center gap-2 text-gray-900">
              <Search className="w-5 h-5" /> Filtrar por palabra
            </label>
            <input
              type="text"
              placeholder="Buscar en mensajes..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border-2 border-gray-300 px-3 py-2 rounded w-full bg-white text-gray-900 focus:border-green-500 focus:outline-none"
            />
            {searchKeyword && (
              <p className="text-sm text-gray-700">
                {filteredIndexes.length} coincidencia
                {filteredIndexes.length === 1 ? "" : "s"} encontradas
              </p>
            )}
          </div>
        )}

        {hasSearched && (
          <div className="border-2 border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-4 max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-700 text-center">
                No se encontraron conversaciones
              </p>
            ) : (
              <>
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <h3 className="font-bold text-gray-900">
                    {messages[0].contact_name}
                  </h3>
                  <p className="text-sm text-gray-700">{messages[0].phone}</p>
                </div>

                {messages.map((msg, idx) => {
                  const isMatch = searchKeyword.trim()
                    ? msg.message
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase()) ||
                      msg.contact_name
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    : false;

                  return (
                    <div
                      key={msg._id}
                      ref={(el) => (keywordRefs.current[idx] = el)}
                      className={`flex ${
                        msg.sender === "nosotros"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === "nosotros"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isMatch ? "bg-yellow-100/60 px-1 rounded" : ""
                          }`}
                        >
                          {msg.message}
                        </p>
                        {msg.attachment_url && (
                          <a
                            href={msg.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline block mt-1"
                          >
                            Ver adjunto
                          </a>
                        )}
                        <div className="text-xs mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
        </>
  );
}
