import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from .models import User, TravelPackage, Booking
from django.core.serializers.json import DjangoJSONEncoder

# Helper to parse body
def get_json(request):
    try:
        return json.loads(request.body)
    except json.JSONDecodeError:
        return {}

@csrf_exempt
@require_http_methods(["POST"])
def register_view(request):
    data = get_json(request)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')
    full_name = data.get('full_name')

    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'}, status=400)
    
    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already registered'}, status=400)

    try:
        user = User.objects.create_user(
            username=username, 
            email=email, 
            password=password,
            phone=phone,
            full_name=full_name
        )
        # Auto login
        login(request, user)
        return JsonResponse({'message': 'Registration successful', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt # For simplicity in this demo, normally use CSRF token
@require_http_methods(["POST"])
def login_view(request):
    data = get_json(request)
    username = data.get('username')
    password = data.get('password')
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username, 'email': user.email, 'full_name': user.full_name}})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})

@require_http_methods(["GET"])
def user_data(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'user': {
                'id': request.user.id, 
                'username': request.user.username, 
                'email': request.user.email,
                'full_name': request.user.full_name,
                'phone': request.user.phone
            }
        })
    return JsonResponse({'error': 'Not authenticated'}, status=401)

@require_http_methods(["GET"])
def package_list(request):
    packages = TravelPackage.objects.all()
    # Manual serialization
    data = []
    for pkg in packages:
        data.append({
            'id': pkg.id,
            'title': pkg.title,
            'description': pkg.description,
            'price': float(pkg.price),
            'duration': pkg.duration,
            'image': pkg.image.url if pkg.image else '/static/placeholder.jpg',
            'itinerary': pkg.itinerary
        })
    return JsonResponse({'packages': data})

@require_http_methods(["GET"])
def package_detail(request, pk):
    pkg = get_object_or_404(TravelPackage, pk=pk)
    data = {
        'id': pkg.id,
        'title': pkg.title,
        'description': pkg.description,
        'price': float(pkg.price),
        'duration': pkg.duration,
        'image': pkg.image.url if pkg.image else '/static/placeholder.jpg',
        'itinerary': pkg.itinerary
    }
    return JsonResponse(data)

@csrf_exempt
@require_http_methods(["POST"])
def create_booking(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    data = get_json(request)
    pkg_id = data.get('package_id')
    travel_date = data.get('travel_date')
    people = int(data.get('people', 1))

    pkg = get_object_or_404(TravelPackage, pk=pkg_id)
    total = pkg.price * people

    booking = Booking.objects.create(
        user=request.user,
        travel_package=pkg,
        travel_date=travel_date,
        number_of_people=people,
        total_amount=total
    )

    return JsonResponse({'message': 'Booking confirmed!', 'booking_id': booking.id})

@require_http_methods(["GET"])
def user_bookings(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    bookings = Booking.objects.filter(user=request.user).order_by('-booking_date')
    data = []
    for b in bookings:
        data.append({
            'id': b.id,
            'package_title': b.travel_package.title,
            'booking_date': b.booking_date,
            'travel_date': b.travel_date,
            'people': b.number_of_people,
            'total_amount': float(b.total_amount),
            'image': b.travel_package.image.url if b.travel_package.image else None
        })
    return JsonResponse({'bookings': data})
