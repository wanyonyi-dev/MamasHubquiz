package com.example.bk

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
class MainActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        auth = FirebaseAuth.getInstance()

        val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
        val tvEmail = findViewById<TextView>(R.id.tvEmail)
        val btnLogout = findViewById<Button>(R.id.btnLogout)

        // Get the currently logged-in user
        val currentUser = auth.currentUser

        if (currentUser != null) {
            tvEmail.text = "Your Email: ${currentUser.email}"
            tvWelcome.text = "Welcome, ${currentUser.email}"
        } else {
            Toast.makeText(this, "No user is logged in", Toast.LENGTH_SHORT).show()
            // Redirect to Login Activity
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }



        btnLogout.setOnClickListener {
            auth.signOut()
            Toast.makeText(this, "Logged out successfully", Toast.LENGTH_SHORT).show()
            // Redirect to Login Activity
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}