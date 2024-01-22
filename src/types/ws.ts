interface WebSocketProviderProps {
  children: React.ReactNode;

  /** The URL for the WebSocket to connect to. */
  url: string;
  /** The subprotocols to use. */
  protocols?: string[] | string;
  /** The binary type to use. */
  binaryType?: BinaryType;
}
