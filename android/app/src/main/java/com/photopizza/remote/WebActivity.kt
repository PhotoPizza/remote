package com.photopizza.remote

import android.annotation.SuppressLint
import android.net.http.SslError
import android.os.Bundle
import android.webkit.PermissionRequest
import android.webkit.SslErrorHandler
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.photopizza.remote.databinding.ActivityWebBinding

class WebActivity : AppCompatActivity() {

    private lateinit var binding: ActivityWebBinding

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWebBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // WebView setup
        binding.webView.apply {
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    // Process all URLs inside WebView
                    return false
                }
                
                // Allow insecure connections
                override fun onReceivedSslError(view: WebView, handler: SslErrorHandler, error: SslError) {
                    handler.proceed() // Ignore SSL errors
                }
            }
            
            webChromeClient = object : WebChromeClient() {
                // Allow resource access requests
                override fun onPermissionRequest(request: PermissionRequest) {
                    request.grant(request.resources)
                }
            }
            
            // Enable JavaScript
            settings.javaScriptEnabled = true
            
            // Enable DOM Storage
            settings.domStorageEnabled = true
            
            // Set scaling
            settings.loadWithOverviewMode = true
            settings.useWideViewPort = true
            
            // Caching
            settings.cacheMode = WebSettings.LOAD_DEFAULT
            
            // ES6 modules support
            settings.allowFileAccess = true
            settings.allowContentAccess = true
            settings.allowFileAccessFromFileURLs = true
            settings.allowUniversalAccessFromFileURLs = true
            
            // Allow mixed content (HTTP in HTTPS)
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            
            // Load HTML from assets
            loadUrl("file:///android_asset/index.html")
        }
    }

    override fun onBackPressed() {
        if (binding.webView.canGoBack()) {
            binding.webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
} 