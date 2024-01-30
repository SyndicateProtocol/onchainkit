type Button = {
  label: string;
  action?: 'post' | 'post_redirect';
};

type FrameMetadata = {
  buttons: [Button, ...Button[]];
  image: string;
  post_url: string;
  refresh_period?: number;
};

type FrameMetadataResponse = Record<string, string>;

/**
 * This function generates the metadata for a Farcaster Frame.
 * @param buttons: The buttons to use for the frame.
 * @param image: The image to use for the frame.
 * @param post_url: The URL to post the frame to.
 * @param refresh_period: The refresh period for the image used.
 * @returns The metadata for the frame.
 */
export const getFrameMetadata = function ({
  buttons,
  image,
  post_url,
  refresh_period,
}: FrameMetadata): FrameMetadataResponse {
  const metadata: Record<string, string> = {
    'fc:frame': 'vNext',
  };
  buttons.forEach((button, index) => {
    metadata[`fc:frame:button:${index + 1}`] = button.label;
    if (button.action) {
      metadata[`fc:frame:button:${index + 1}:action`] = button.action;
    }
  });
  metadata['fc:frame:image'] = image;
  metadata['fc:frame:post_url'] = post_url;
  if (refresh_period) {
    metadata['fc:frame:refresh_period'] = refresh_period.toString();
  }
  return metadata;
};
