import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader, SearchInput } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/ui/Input';
import { mockConversations, mockMessages } from '../data/mockData';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conversationMessages = messages.filter(
    (m) => m.conversationId === selectedConversation.id
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: `msg_${Date.now()}`,
        conversationId: selectedConversation.id,
        sender: 'Marcus Sterling',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Chat" subtitle="Connect with other players" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-96 md:h-screen">
        {/* Conversation List */}
        <Card className="md:col-span-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <SearchInput
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Icon icon="solar:magnifer-bold" />}
            />

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedConversation.id === conv.id
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar src={conv.participantAvatar} name={conv.participantName} size="sm" status={conv.online ? 'online' : 'offline'} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{conv.participantName}</p>
                        <p className="text-xs text-gray-300 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">{conv.lastMessageTime}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No conversations found</p>
              )}
            </div>
          </div>
        </Card>

        {/* Chat Area */}
        {selectedConversation && (
          <Card className="md:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar src={selectedConversation.participantAvatar} name={selectedConversation.participantName} size="md" />
                <div>
                  <p className="font-semibold text-white">{selectedConversation.participantName}</p>
                  <p className="text-xs text-gray-400">
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon icon="solar:info-circle-bold" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {conversationMessages.length > 0 ? (
                conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'Marcus Sterling' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender !== 'Marcus Sterling' && (
                      <Avatar src={selectedConversation.participantAvatar} name={msg.sender} size="sm" />
                    )}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'Marcus Sterling'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No messages yet. Start the conversation!</p>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2 pt-4 border-t border-gray-700">
              <Input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-gray-700"
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                <Icon icon="solar:send-bold" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
