declare global {
  var SigmaManager: {
    new (): any;
    isSupported: () => boolean;
  };
}

export {};
