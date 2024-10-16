
// InterstitialAdComponent.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4722408711040377/7035651130';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export const InterstitialAdComponent = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    return () => unsubscribe();
  }, []);

  return (
    <Button
      title={loaded ? "Show Interstitial" : "Loading Ad..."}
      disabled={!loaded}
      onPress={() => {
        if (loaded) {
          interstitial.show();
        }
      }}
    />
  );
};


