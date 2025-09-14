using UnityEngine;

public class BirbScript : MonoBehaviour
{
    public Rigidbody2D myRigidbody;
    public float flapStrength = 10;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start() // runs only once
    {
        
    }

    // Update is called once per frame
    void Update() // runs constantly while the script is enabled
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            myRigidbody.linearVelocity = Vector2.up * flapStrength;
        }
        
    }
}
