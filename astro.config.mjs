// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://horseshoebend.com',
  output: 'static',
  adapter: cloudflare(),

  // All 301 redirects — served as _redirects by Cloudflare at the CDN edge
  redirects: {
    // Parking & fees
    '/parking-lot-reopens/':                                     '/parking-fees/',
    '/help-theres-no-place-to-park-at-horseshoe-bend/':          '/parking-fees/',
    '/trail-facility-upgrades-underway-at-horseshoe-bend/':       '/parking-fees/',

    // Best time / photography (18 pages → 1)
    '/best-time-visit-horseshoe-bend/':                          '/best-time-to-visit-horseshoe-bend/',
    '/brian-klimowski-photography-tips-from-the-pros/':          '/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-from-the-pros-joshua-cripps/':            '/best-time-to-visit-horseshoe-bend/',
    '/tips-from-the-pros-trevor-murphy/':                        '/best-time-to-visit-horseshoe-bend/',
    '/keithbriley/':                                             '/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-from-the-pros-andrew-louie/':             '/best-time-to-visit-horseshoe-bend/',
    '/photographing-horseshoe-bend-tips-from-the-pros-nir-amos/':'/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-from-the-pros-colleen-miniuk-sperry/':    '/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-from-the-pros-boyd-prestidge/':           '/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-pros-alaina-ann/':                        '/best-time-to-visit-horseshoe-bend/',
    '/jeff-stamer-photography-tips-pros/':                       '/best-time-to-visit-horseshoe-bend/',
    '/megan-matsumoto-photography-tips-from-the-pros/':          '/best-time-to-visit-horseshoe-bend/',
    '/photographing-horseshoe-bend-marco-schroder/':             '/best-time-to-visit-horseshoe-bend/',
    '/photography-tips-from-the-pros-ryan-houston/':             '/best-time-to-visit-horseshoe-bend/',
    '/tips-from-the-pros-aaron-meyers/':                         '/best-time-to-visit-horseshoe-bend/',
    '/tips-from-the-pros-brad-scott/':                           '/best-time-to-visit-horseshoe-bend/',
    '/category/photographing-horseshoe-bend/':                   '/best-time-to-visit-horseshoe-bend/',
    '/category/photographing-horseshoe-bend/page/2/':            '/best-time-to-visit-horseshoe-bend/',
    '/category/photographing-horseshoe-bend/page/3/':            '/best-time-to-visit-horseshoe-bend/',
    '/home-2-2/amazing-sunset-vista-of-horseshoe-bend-in-page-arizona/': '/best-time-to-visit-horseshoe-bend/sunset/',

    // River & water tours (ALL water experiences)
    '/see-the-canyon-from-the-river-glen-canyon-float-trip/':    '/river-tours/',
    '/kayak-horseshoe-bend/':                                    '/river-tours/',
    '/scenic-canyon-river-adventure-sgp-5r/':                    '/river-tours/',
    '/antelope-canyon-lake-powell-boat-tour/':                   '/river-tours/',
    '/antelope-canyon-lake-powell-boat-tour/antelope-canyon-lake-powell-tour-2/': '/river-tours/',
    '/upper-antelope-boat-tour/':                                '/river-tours/',
    '/lower-antelope-boat-tour/':                                '/river-tours/',
    '/upperlowerantelopecanyonboat/':                            '/river-tours/',

    // Antelope Canyon (land-based slot canyon tours only)
    '/horseshoe-bend-slot-canyon-tour/':                         '/antelope-canyon/',
    '/upper-lower-antelope-canyon-tour/':                        '/antelope-canyon/',
    '/upper-lower-antelope-canyon-tour/ladder/':                 '/antelope-canyon/',
    '/gunfighter-canyon/':                                       '/antelope-canyon/',
    '/horseshoe-bend-antelope-canyon-tour/':                     '/antelope-canyon/',
    '/antelope-canyon/lower-antelope-canyon/':                   '/antelope-canyon/',
    '/antelope-canyon/upper-antelope-canyon-showing-sun-beam-coming-into-slot-canyon/': '/antelope-canyon/',
    '/category/antelope-canyon/':                                '/antelope-canyon/',

    // Directions
    '/how-to-get-here/':                                         '/directions/',
    '/get-horseshoe-bend-las-vegas/':                            '/directions/',

    // Hike
    '/help-cant-hike-horseshoe-bend/':                           '/hike-horseshoe-bend/',
    '/horseshoe-bend-the-initmate-grand-canyon-experience/':     '/hike-horseshoe-bend/',
    '/the-colorado-river-meaders-through-horseshoe-bend-near-page-arizona/': '/hike-horseshoe-bend/',

    // Plan your visit
    '/what-should-i-bring-to-horseshoe-bend/':                   '/plan-your-visit/',
    '/dont-miss-your-tour/':                                     '/plan-your-visit/',
    '/category/information/':                                    '/plan-your-visit/',
    '/category/information/page/2/':                             '/plan-your-visit/',
    '/category/featured-information/':                           '/plan-your-visit/',
    '/category/featured-information/page/2/':                    '/plan-your-visit/',

    // Tours
    '/fly-over-horseshoe-bend/':                                 '/tours/',
    '/cathedral-slot-canyon-tour/':                              '/tours/',
    '/category/tours/':                                          '/tours/',
    '/category/tours/page/2/':                                   '/tours/',
    '/category/tours-from-page/':                                '/tours/',
    '/category/tours-from-page/page/2/':                         '/tours/',
    '/category/tours-from-grand-canyon/':                        '/tours/',
    '/tours-from-page/':                                         '/tours/',
    '/tours-from-page/2/':                                       '/tours/',

    // Itineraries
    '/48-hours-in-page/':                                        '/itineraries/',
    '/24-hours-in-page-arizona/':                                '/itineraries/',
    '/grand-canyon-zion-moab-14-days-grand-circle/':             '/itineraries/',
    '/grand-canyon-zion-moab-14-days-grand-circle/zion-national-park-with-road-and-snow/': '/itineraries/',

    // Nearby
    '/local-attractions/':                                       '/nearby/',
    '/dam-overlook/':                                            '/nearby/',
    '/arizona-bucket-list-wave-az/':                             '/nearby/',
    '/alstrom-point-tours-at-horseshoe-bend/':                   '/nearby/',
    '/scheduled-air-service/':                                   '/nearby/',
    '/category/places/':                                         '/nearby/',
    '/category/places/page/2/':                                  '/nearby/',

    // Image assets (GSC-tracked)
    '/wp-content/uploads/2012/12/firstlight.jpg':                '/best-time-to-visit-horseshoe-bend/',
    '/wp-content/uploads/2012/12/lateafternoon.jpg':             '/best-time-to-visit-horseshoe-bend/',
    '/wp-content/uploads/2012/12/brian1.jpg':                    '/best-time-to-visit-horseshoe-bend/',
    '/wp-content/uploads/2012/11/page-area-map.pdf':             '/directions/',
    '/wp-content/uploads/2012/11/13-090_Flyer_US89Detour_FINAL.pdf': '/directions/',

    // No-content / archive → homepage
    '/news/':                                                    '/',
    '/news/2/':                                                  '/',
    '/news/3/':                                                  '/',
    '/news/4/':                                                  '/',
    '/news/5/':                                                  '/',
    '/news/6/':                                                  '/',
    '/avantlink/':                                               '/',
    '/category/uncategorized/':                                  '/',
    '/category/uncategorized/page/2/':                           '/',
    '/category/latest-news/':                                    '/',
    '/category/latest-news/page/2/':                             '/',
    '/tag/desktop/':                                             '/',
    '/dsc_4788-2/':                                             '/',
  },
});
