start:
    MOV R0, #5      ; Calculate the factorial of 5 (5!)
    MOV R1, #1      ; Initialize R1 to 1, this will hold the result

loop:
    CMP R0, #1      ; Compare R0 with 1 (R0 - 1)
    BLE end_loop    ; If R0 is less than or equal to 1, end

    MUL R1, R1, R0  ; Multiply R1 by R0, store the result back in R1
    SUB R0, R0, #1  ; Decrement R0 by 1
    B   loop        ; Go back to the start of the loop

end_loop:
    ; At this point, R1 contains the factorial of 5