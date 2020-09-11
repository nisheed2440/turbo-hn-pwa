const { generateSW } = require('workbox-build');

const swDest = 'public/sw.js';
generateSW({
    globDirectory: 'public',
    swDest,
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: new RegExp(/\/*/),
            handler: 'NetworkFirst',
        }
    ],
	// Other configuration options...
}).then(({ count, size }) => {
	console.log(
		`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
	);
});
