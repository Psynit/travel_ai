import os
import django
from PIL import Image, ImageDraw
import requests
from io import BytesIO

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'travelease_backend.settings')
django.setup()

from api.models import TravelPackage

def ensure_media():
    os.makedirs('media/packages', exist_ok=True)

def save_image_from_url(url, filename):
    path = f'media/packages/{filename}'
    if not os.path.exists(path):
        print(f"Downloading {filename}...")
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                with open(path, 'wb') as f:
                    f.write(response.content)
                return f'packages/{filename}'
            else:
                print(f"Failed to download {url}: Status {response.status_code}")
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            # Fallback to placeholder if download fails
    return f'packages/{filename}'

def create_placeholder_image(filename, color):
    path = f'media/packages/{filename}'
    if not os.path.exists(path):
        img = Image.new('RGB', (600, 400), color=color)
        d = ImageDraw.Draw(img)
        d.text((20, 20), filename, fill=(255, 255, 255))
        img.save(path)
    return f'packages/{filename}'

def seed():
    ensure_media()
    packages = [
        {
            'title': 'Santorini Sunset',
            'description': 'Experience the breathtaking sunsets and white-washed architecture of Santorini.',
            'price': 1500.00,
            'duration': '5 Days / 4 Nights',
            'image_url': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival in Thira.\nDay 2: Oia Sunset Tour.\nDay 3: Volcanic Beach Visit.\nDay 4: Wine Tasting.\nDay 5: Departure.'
        },
        {
            'title': 'Swiss Alps Escape',
            'description': 'Immerse yourself in nature with a cozy retreat in the Swiss Alps.',
            'price': 2200.00,
            'duration': '6 Days / 5 Nights',
            'image_url': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival in Zurich.\nDay 2: Jungfraujoch Excursion.\nDay 3: Lake Brienz Cruise.\nDay 4: Grindelwald First Cliff Walk.\nDay 5: Lucerne City Tour.\nDay 6: Departure.'
        },
        {
            'title': 'Parisian Getaway',
            'description': 'Discover the romance and culture of Paris, the City of Light.',
            'price': 1800.00,
            'duration': '5 Days / 4 Nights',
            'image_url': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival & Eiffel Tower.\nDay 2: Louvre Museum.\nDay 3: Montmartre & Sacré-Cœur.\nDay 4: Seine River Cruise.\nDay 5: Departure.'
        },
        {
            'title': 'Tokyo Neon Nights',
            'description': 'Explore the vibrant streets and ancient temples of Tokyo.',
            'price': 2500.00,
            'duration': '7 Days / 6 Nights',
            'image_url': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival in Tokyo.\nDay 2: Shibuya & Harajuku.\nDay 3: Senso-ji Temple.\nDay 4: Akihabara Electronics.\nDay 5: Sushi Making Class.\nDay 6: Shinjuku Nightlife.\nDay 7: Departure.'
        },
        {
            'title': 'New York Explorer',
            'description': 'Taking a bite out of the Big Apple has never been easier.',
            'price': 1600.00,
            'duration': '4 Days / 3 Nights',
            'image_url': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Times Square.\nDay 2: Statue of Liberty.\nDay 3: Central Park & Met Museum.\nDay 4: Broadway Show & Departure.'
        },
        {
            'title': 'Bali Island Paradise',
            'description': 'Relax on pristine beaches and explore lush jungles in Bali.',
            'price': 1400.00,
            'duration': '6 Days / 5 Nights',
            'image_url': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival in Denpasar.\nDay 2: Ubud Monkey Forest.\nDay 3: Tegalalang Rice Terraces.\nDay 4: Uluwatu Temple.\nDay 5: Beach Day.\nDay 6: Departure.'
        },
        {
            'title': 'London Royal Tour',
            'description': 'Experience the history and royalty of London.',
            'price': 1900.00,
            'duration': '5 Days / 4 Nights',
            'image_url': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival & London Eye.\nDay 2: Buckingham Palace.\nDay 3: British Museum.\nDay 4: Tower of London.\nDay 5: Departure.'
        },
        {
            'title': 'Maldives Luxury',
            'description': 'Ultimate luxury and relaxation in the Maldives overwater bungalows.',
            'price': 3500.00,
            'duration': '5 Days / 4 Nights',
            'image_url': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'itinerary': 'Day 1: Arrival using Seaplane.\nDay 2: Snorkeling & Diving.\nDay 3: Spa Day.\nDay 4: Sunset Cruise.\nDay 5: Departure.'
        }
    ]

    for p in packages:
        if TravelPackage.objects.filter(title=p['title']).exists():
            print(f"Skipping {p['title']} - already exists.")
            continue

        img_filename = f"{p['title'].replace(' ', '_').lower()}.jpg"
        if 'image_url' in p:
            img_path = save_image_from_url(p['image_url'], img_filename)
        else:
            img_path = create_placeholder_image(img_filename, 'gray')

        TravelPackage.objects.create(
            title=p['title'],
            description=p['description'],
            price=p['price'],
            duration=p['duration'],
            image=img_path,
            itinerary=p['itinerary']
        )
        print(f"Created {p['title']}")

if __name__ == '__main__':
    seed()
