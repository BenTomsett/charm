main:
    MOV R0, #2880   ; First number
    MOV R1, #1232   ; Second number

gcd_loop:
    CMP R0, R1      ; Compare R0 and R1
    BEQ end         ; If they are equal, GCD is found, jump to end
    BGT greater     ; If R0 > R1, execute greater block
    BLT less        ; If R0 < R1, execute less block

greater:
    SUB R0, R0, R1  ; Subtract R1 from R0
    B gcd_loop      ; Go back to the start of the loop

less:
    SUB R1, R1, R0  ; Subtract R0 from R1
    B gcd_loop      ; Go back to the start of the loop

end:
  ; At this point, R0 contains the GCD