<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // View messages sent to the authenticated user
    public function index()
    {
        $messages = Message::where('receiver_id', Auth::id())->latest()->get();
        return response()->json($messages);
    }

    // Send an anonymous message to a user
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($message, 201);
    }

    // Delete a message (only if it belongs to the authenticated user)
    public function destroy($id)
    {
        $message = Message::findOrFail($id);

        if ($message->receiver_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
