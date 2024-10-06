import { getChat } from "@/lib/api";

export default async function ChatSection({ params }) {
    const chat = await getChat(params.chatid)
    console.log(chat.data);

    const candidateName = "Dammy";
    
    // Dummy chat messages
    const messages = [
      {
        sender: "You",
        content: "Hello! I'm interested in discussing more details with you.",
        time: "12:00 PM",
      },
      {
        sender: candidateName,
        content: "Hi! I'm happy to answer your questions.",
        time: "12:02 PM",
      },
      {
        sender: "You",
        content: "Great! When are you available for a quick call?",
        time: "12:05 PM",
      },
    ];

    console.log(messages)
  
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-dark-blue mb-6">
          Contact {candidateName}
        </h2>
  
        {/* Chat UI */}
        <div className="bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto shadow-md">
          {chat?.data?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-4 ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-teal text-white"
                    : "bg-light-blue text-dark-blue"
                }`}
              >
                <p className="font-medium">{msg.sender}</p>
                <p>{msg.content}</p>
                <span className="block text-sm text-gray-500 text-right mt-2">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        {/* Message Input */}
        <div className="mt-4 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal"
          />
          <button className="bg-teal text-white px-6 py-2 rounded-full hover:bg-dark-blue transition-colors">
            Send
          </button>
        </div>
      </div>
    );
  }
  