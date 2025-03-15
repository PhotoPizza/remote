package com.photopizza.remote

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.FrameLayout
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.photopizza.remote.databinding.ActivityMainBinding
import org.java_websocket.client.WebSocketClient
import org.java_websocket.handshake.ServerHandshake
import org.json.JSONObject
import java.net.URI
import java.net.URISyntaxException

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var webSocketClient: WebSocketClient? = null
    private var photoPizzaIP = "192.168.4.1"
    private var config = PhotoPizzaConfig()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupListeners()
        updateUIFromConfig()
    }

    private fun setupUI() {
        // Setup shooting mode dropdown
        val shootingModes = arrayOf(getString(R.string.interval), getString(R.string.ping_pong))
        val shootingModeAdapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, shootingModes)
        binding.shootingModeDropdown.setAdapter(shootingModeAdapter)

        // Setup direction dropdown
        val directions = arrayOf(getString(R.string.clockwise), getString(R.string.counterclockwise))
        val directionAdapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, directions)
        binding.directionDropdown.setAdapter(directionAdapter)
    }

    private fun setupListeners() {
        binding.connectBtn.setOnClickListener {
            photoPizzaIP = binding.ipInput.text.toString()
            connectWebSocket()
        }

        binding.startBtn.setOnClickListener {
            if (config.state != "waiting") return@setOnClickListener
            config.state = "start"
            sendConfig()
        }

        binding.stopBtn.setOnClickListener {
            if (config.state == "waiting") return@setOnClickListener
            config.state = "stop"
            sendConfig()
        }

        binding.saveBtn.setOnClickListener {
            updateConfigFromUI()
            config.state = "save"
            sendConfig()
        }

        binding.frameInput.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                config.frame = binding.frameInput.text.toString().toIntOrNull() ?: 100
                config.framesLeft = config.frame
                binding.frameLeft.text = config.framesLeft.toString()
                setTurnSection()
            }
        }
    }

    private fun updateUIFromConfig() {
        binding.frameInput.setText(config.frame.toString())
        binding.speedInput.setText(config.speed.toString())
        binding.pauseInput.setText(config.pause.toString())
        binding.delayInput.setText(config.delay.toString())
        binding.allStepsInput.setText(config.allSteps.toString())
        binding.frameLeft.text = config.framesLeft.toString()
        
        // Set shooting mode
        binding.shootingModeDropdown.setText(
            if (config.shootingMode == 0) getString(R.string.interval) else getString(R.string.ping_pong),
            false
        )
        
        // Set direction
        binding.directionDropdown.setText(
            if (config.direction == 1) getString(R.string.clockwise) else getString(R.string.counterclockwise),
            false
        )
    }

    private fun updateConfigFromUI() {
        config.frame = binding.frameInput.text.toString().toIntOrNull() ?: 100
        config.speed = binding.speedInput.text.toString().toIntOrNull() ?: 5000
        config.pause = binding.pauseInput.text.toString().toIntOrNull() ?: 100
        config.delay = binding.delayInput.text.toString().toIntOrNull() ?: 300
        config.allSteps = binding.allStepsInput.text.toString().toIntOrNull() ?: 200
        
        // Update shooting mode
        config.shootingMode = if (binding.shootingModeDropdown.text.toString() == getString(R.string.interval)) 0 else 1
        
        // Update direction
        config.direction = if (binding.directionDropdown.text.toString() == getString(R.string.clockwise)) 1 else 0
    }

    private fun connectWebSocket() {
        val uri: URI
        try {
            uri = URI("ws://$photoPizzaIP:81")
        } catch (e: URISyntaxException) {
            e.printStackTrace()
            return
        }

        webSocketClient = object : WebSocketClient(uri) {
            override fun onOpen(handshakedata: ServerHandshake) {
                runOnUiThread {
                    binding.statusIcon.setBackgroundColor(ContextCompat.getColor(this@MainActivity, R.color.green))
                    binding.statusIcon.setImageResource(R.drawable.ic_open)
                    binding.connectBtn.visibility = View.GONE
                }
                sendCommand("getConfig")
            }

            override fun onMessage(message: String) {
                try {
                    val jsonObject = JSONObject(message)
                    if (jsonObject.has("config")) {
                        val configJson = jsonObject.getJSONObject("config")
                        config.updateFromJson(configJson)
                        runOnUiThread {
                            updateUIFromConfig()
                            setTurnSection()
                        }
                    } else if (jsonObject.has("status")) {
                        val statusJson = jsonObject.getJSONObject("status")
                        config.updateStatusFromJson(statusJson)
                        runOnUiThread {
                            binding.frameLeft.text = config.framesLeft.toString()
                            rotateCursor(config.currentStep)
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            override fun onClose(code: Int, reason: String, remote: Boolean) {
                runOnUiThread {
                    binding.statusIcon.setBackgroundColor(ContextCompat.getColor(this@MainActivity, R.color.red))
                    binding.statusIcon.setImageResource(R.drawable.ic_close)
                    binding.connectBtn.visibility = View.VISIBLE
                }
            }

            override fun onError(ex: Exception) {
                runOnUiThread {
                    binding.statusIcon.setBackgroundColor(ContextCompat.getColor(this@MainActivity, R.color.red))
                    binding.statusIcon.setImageResource(R.drawable.ic_close)
                    binding.connectBtn.visibility = View.VISIBLE
                    Toast.makeText(this@MainActivity, "Error: ${ex.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
        webSocketClient?.connect()
    }

    private fun sendCommand(command: String) {
        webSocketClient?.send(command)
    }

    private fun sendConfig() {
        val jsonObject = JSONObject()
        jsonObject.put("config", config.toJson())
        webSocketClient?.send(jsonObject.toString())
    }

    private fun sendInfinityCommand() {
        val jsonObject = JSONObject()
        jsonObject.put("infinity", config.direction)
        webSocketClient?.send(jsonObject.toString())
    }

    private fun setTurnSection() {
        binding.turnSection.removeAllViews()
        val sectionCount = config.frame
        val sectionAngle = 360f / sectionCount

        for (i in 0 until sectionCount) {
            // Create a container for the division line (similar to div in web version)
            val sectionContainer = FrameLayout(this)
            val containerParams = FrameLayout.LayoutParams(
                160, // Width 160px as in web version
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            sectionContainer.layoutParams = containerParams
            
            // Create a division line (similar to div.section-deg in web version)
            val sectionView = View(this)
            val sectionParams = FrameLayout.LayoutParams(
                resources.getDimensionPixelSize(R.dimen.section_width),
                resources.getDimensionPixelSize(R.dimen.section_height)
            )
            sectionParams.gravity = android.view.Gravity.RIGHT
            sectionView.layoutParams = sectionParams
            sectionView.setBackgroundColor(ContextCompat.getColor(this, R.color.theme_9))
            sectionView.id = View.generateViewId()
            sectionView.tag = "section-deg-$i"
            
            // Add the line to the container
            sectionContainer.addView(sectionView)
            
            // Set container styles as in web version
            sectionContainer.rotation = i * sectionAngle
            sectionContainer.translationX = 80f // translate(80px, 0) as in web version
            
            // Set the transformation point to the left center (transform-origin: left center)
            sectionContainer.pivotX = 0f
            sectionContainer.pivotY = sectionContainer.height / 2f
            
            // Add the container to turnSection
            binding.turnSection.addView(sectionContainer)
        }
    }

    private fun rotateCursor(step: Int) {
        val angle = (step.toFloat() / config.allSteps.toFloat()) * 360f
        
        // In the web version, the cursor is already rotated 90 degrees via CSS (transform: rotate(90deg))
        // and rotates together with degree
        binding.cursorIcon.rotation = 90f
        binding.degree.rotation = angle
        
        // If there is an active segment, highlight it
        val dir = if (config.direction == 1) -1 else 1
        val sectionId = if (config.direction == 1) {
            "section-deg-${config.frame - config.framesLeft}"
        } else {
            "section-deg-${config.framesLeft}"
        }
        
        // Reset the color of all sections
        for (i in 0 until binding.turnSection.childCount) {
            val container = binding.turnSection.getChildAt(i) as? FrameLayout
            container?.let {
                if (it.childCount > 0) {
                    val sectionView = it.getChildAt(0)
                    sectionView.setBackgroundColor(ContextCompat.getColor(this, R.color.theme_9))
                }
            }
        }
        
        // Highlight the active section
        for (i in 0 until binding.turnSection.childCount) {
            val container = binding.turnSection.getChildAt(i) as? FrameLayout
            container?.let {
                if (it.childCount > 0) {
                    val sectionView = it.getChildAt(0)
                    if (sectionView.tag == sectionId) {
                        sectionView.setBackgroundColor(ContextCompat.getColor(this, R.color.primary_bg_color))
                    }
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        webSocketClient?.close()
    }
}
