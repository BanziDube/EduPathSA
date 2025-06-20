import ChatbotLogo from './logo.png';

export default function ChatbotButton() {
  return (
    <a
      href="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/17/12/20250617125625-96GCNLP4.json"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center bg-white text-blue-600 px-5 py-3 rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 shadow-xl group"
    >
      <span className="mr-3 group-hover:underline">Chat with Us</span>
      <img
        src={ChatbotLogo}
        alt="EduPathAI"
        className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </a>
  );
}
